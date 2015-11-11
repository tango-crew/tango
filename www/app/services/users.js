import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class UsersService {
  public endpoint = 'http://localhost:3000';

  constructor(http: Http) {
    this.http = http;
  }

  all() {
    return this.http.get(`${this.endpoint}/users`)
      .map(res => res.json());
  }

  get(id) {
    return this.http.get(`${this.endpoint}/users/${id}`)
      .map(res => res.json());
  }

  create(params) {
    return this.http.post(`${this.endpoint}/users`, JSON.stringify(params))
      .map(res => res.json());
  }

  update(id: Number, params) {
    return this.http.put(`${this.endpoint}/users/${id}`, JSON.stringify(params))
      .map(res => res.json());
  }

  destroy(id: Number) {
    return this.http.delete(`${this.endpoint}/users/${id}`)
      .map(res => res.json());
  }
}
