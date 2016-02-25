export class User {
  id:number;
  name:string;
  email:string;
  integration_id:string;
  integration_type:number;
  bio:string;
  birthday:string;
  password:string;
  password_confirmation:string;

  constructor() {
  }

  avatar() {
    if (this.integration_type === 1) {
      return `https://graph.facebook.com/${this.integration_id}/picture?width=400&height=400`;
    } else {
      return null;
    }
  }
}
