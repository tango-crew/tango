import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {ResourceBaseService} from './resource_base';

@Injectable()
export class UsersService extends ResourceBaseService {
  constructor(private http: Http) {
    super(http, 'users');
  }

  signIn(email: string, password: string) {
    return this.http.post(
      `${this.endpoint}/${this.resource}/sign_in`,
      JSON.stringify({
        "user": {
          "email": email,
          "password": password
        }
      })
    ).map(res => res.json());
  }
}
