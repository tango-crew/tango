import {Pipe, PipeTransform, Injectable} from 'angular2/core';
import {AmazonS3Service} from '../services/amazon_s3';

/*
 * Generate a signed URL to a s3 Object by a key
 * Usage:
 *   value | s3SignedUrl
 * Example:
 *   {{ key | s3SignedUrl}}
 */
@Pipe({name: 's3SignedUrl'})
@Injectable()
export class S3SignedUrlPipe implements PipeTransform {
  constructor(private amazonS3Service:AmazonS3Service) {
  }

  transform(value:string, args:string[]):String {
    return value ? this.amazonS3Service.getSignedImageUrl(value) : null;
  }
}
