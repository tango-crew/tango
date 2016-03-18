import {Http} from 'angular2/http';

export class ResourceBaseService {
  protected endpoint:string = 'http://tango-api.herokuapp.com';

  constructor(private http:Http, protected resource:string) {
  }

  all() {
    return this.http
      .get(`${this.endpoint}/${this.resource}`)
      .map(res => res.json());
  }

  get(id) {
    return this.http
      .get(`${this.endpoint}/${this.resource}/${id}`)
      .map(res => res.json());
  }

  create(params) {
    return this.http
      .post(`${this.endpoint}/${this.resource}`, JSON.stringify(params))
      .map(res => res.json());
  }

  update(id:Number, params) {
    return this.http
      .put(`${this.endpoint}/${this.resource}/${id}`, JSON.stringify(params))
      .map(res => res.json());
  }

  destroy(id:Number) {
    return this.http
      .delete(`${this.endpoint}/${this.resource}/${id}`)
      .map(res => res.json());
  }
}
