import {Injectable} from 'angular2/core';
// import {Settings} from '../settings'

@Injectable()
export class AmazonS3Service {
  constructor() {
    AWS.config.update({
      accessKeyId: Settings.awsAccessKeyId,
      secretAccessKey: Settings.awsSecretAccessKey
    });
    AWS.config.region = Settings.awsRegion;
  }

  private cacheBucket() {
    return new AWS.S3({params: {Bucket: 'tango-staging/cache'}});
  }

  private storeBucket() {
    return new AWS.S3({params: {Bucket: 'tango-staging/store'}});
  }

  upload(fileURI) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURI(
        fileURI,
        fileEntry => {
          fileEntry.file(
            file => {
              let reader = new FileReader();

              reader.onloadend = () => {
                var params = {Key: file.name, ContentType: file.type, Body: reader.result, ACL: 'public-read'};

                this.cacheBucket().upload(params, function (err, data) {
                    if (err) {
                      reject(err);
                    } else {
                      console.log('Upload Done', data);
                      resolve(data);
                    }
                  })
                  .on('httpUploadProgress', function (progress) {
                    console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
                  });
              };

              reader.readAsArrayBuffer(file);
            },
            this.fileErrorHandler
          );
        },
        this.fileErrorHandler
      );
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this.cacheBucket()
        .deleteObject(
          {Key: key},
          (err, data) => {
            if (err)
              reject(err);
            else
              resolve(data);
          }
        );
    });
  }

  getSignedImageUrl(key) {
    return this.storeBucket().getSignedUrl('getObject', {Key: key, Expires: 30*60});
  }

  fileErrorHandler(fileName, e) {
    var msg = '';

    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'Storage quota exceeded';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'File not found';
        break;
      case FileError.SECURITY_ERR:
        msg = 'Security error';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'Invalid modification';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'Invalid state';
        break;
      default:
        msg = 'Unknown error';
        break;
    }

    console.error(`Error (${fileName}): ${msg}`);
  }
}
