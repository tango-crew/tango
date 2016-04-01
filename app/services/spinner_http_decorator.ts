import {Http, RequestOptions, ConnectionBackend, RequestOptionsArgs, Request, Response, Headers} from 'angular2/http';
import {Events, Storage} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
// import {Settings} from '../settings'

export class SpinnerHttpDecorator {
  private http:Http;
  private apiToken:string;

  constructor(
    backend:ConnectionBackend,
    defaultOptions:RequestOptions,
    private events:Events,
    private storage:Storage) {
    const API_TOKEN = Settings.apiToken;

    this.events.subscribe('user:authenticated', args => this.apiToken = Object.assign(new User(), args[0]).token);
    this.events.subscribe('user:unauthenticated', args => this.apiToken = API_TOKEN);
    storage.get('user')
      .then(
        user => this.apiToken = user ? Object.assign(new User(), JSON.parse(user)).token : API_TOKEN,
        err => this.apiToken = API_TOKEN
      );

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

  private appendOrInit(options?:RequestOptionsArgs):RequestOptionsArgs {
    options = options || new RequestOptions({ headers: new Headers() });
    options.headers.append('Content-Type', 'application/json');
    options.headers.append('X-Tango-Api-Token', this.apiToken);
    return options;
  }

  request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.request(url, this.appendOrInit(options)));
  }

  get(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.get(url, this.appendOrInit(options)));
  }

  post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.post(url, body, this.appendOrInit(options)));
  }

  put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.put(url, body, this.appendOrInit(options)));
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.delete(url, this.appendOrInit(options)));
  }

  patch(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.patch(url, body, this.appendOrInit(options)));
  }

  head(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.decorate(() => this.http.head(url, this.appendOrInit(options)));
  }
}
