import {Injectable} from 'angular2/angular2';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class UsersService {
  public endpoint = 'http://localhost:3000';
  public authHeaders = new Headers({
    'X-Tango-Api-Token': 'jD1yROsja0E59l4sK4LqPRqFSfPpIQIQ',
    'Content-Type': 'application/json'
  });

  constructor(http: Http) {
    this.http = http;
  }

  all() {
    return this.http.get(`${this.endpoint}/users`, {headers: this.authHeaders})
      .map(res => res.json());
  }

  get(id) {
    return this.http.get(`${this.endpoint}/users/${id}`, {headers: this.authHeaders})
      .map(res => res.json());
  }

  create(params) {
    return this.http.post(`${this.endpoint}/users`, JSON.stringify(params), {headers: this.authHeaders})
      .map(res => res.json());
  }

  update(id: Number, params) {
    return this.http.put(`${this.endpoint}/users/${id}`, JSON.stringify(params), {headers: this.authHeaders})
      .map(res => res.json());
  }

  destroy(id: Number) {
    return this.http.delete(`${this.endpoint}/users/${id}`, {headers: this.authHeaders})
      .map(res => res.json());
  }
}
