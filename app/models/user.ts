export class User {
  id:number;
  name:string;
  email:string;
  token:string;
  integration_id:string;
  integration_type:number;
  bio:string;
  birthday:string;
  password:string;
  password_confirmation:string;
  profile_image_id:string;
  profile_image_filename:string;
  profile_image_content_type:string;
  profile_image_size:number;
  remote_profile_image_url:string;/* Used only to upload image */

  constructor() {
  }

  avatar() {
    if (this.integration_type === 1) {
      return `https://graph.facebook.com/${this.integration_id}/picture?width=400&height=400`;
    } else {
      return 'img/avatar.png';
    }
  }
}
