import {Http, RequestOptions, ConnectionBackend, RequestOptionsArgs, Request, Response} from 'angular2/http';
import {Events} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

export class SpinnerHttpDecorator {
  private http:Http;

  constructor(backend:ConnectionBackend, defaultOptions:RequestOptions, private events:Events) {
    this.http = new Http(backend, defaultOptions);
  }

  private decorate(fn) {
    this.events.publish('spinner', true);
    return fn()
      .do(() => this.events.publish('spinner', false))
      .catch((error:any) => {
        this.events.publish('spinner', false);
        return Observable.throw(error.json() || 'Server error');
      });
  }

  request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.request(url, options));
  }

  get(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.get(url, options));
  }

  post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.post(url, body, options));
  }

  put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.put(url, body, options));
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.delete(url, options));
  }

  patch(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.patch(url, body, options));
  }

  head(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.head(url, options));
  }
}
