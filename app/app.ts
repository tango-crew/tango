import {App, IonicApp, Platform, Events, Storage, LocalStorage} from 'ionic-framework/ionic';
import {Http, XHRBackend, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {provide, Type} from 'angular2/core';
import 'rxjs/Rx';

import {AuthenticationPage} from './pages/authentication/authentication';
import {ProfilePage} from './pages/profile/profile';
import {FacebookService} from './services/facebook';
import {AmazonS3Service} from './services/amazon_s3';
import {UsersService} from './services/users';
import {User} from './models/user';
import {PushNotifications} from './services/push_notifications';

@App({
  templateUrl: 'build/app.html',
  providers: [
    FacebookService,
    UsersService,
    AmazonS3Service,
    provide(Http,
      {
        useFactory: (backend, defaultOptions) => {
          defaultOptions.headers.append('X-Tango-Api-Token', 'TANGO_API_TOKEN');
          defaultOptions.headers.append('Content-Type', 'application/json');
          return new Http(backend, defaultOptions);
        },
        deps: [XHRBackend, RequestOptions]
      }
    )
  ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/,
})
class TangoApp {
  rootPage: Type;
  storage: Storage;
  pages: Array<{title: string, component: Type}>;
  user: User;

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private events: Events,
    private facebookService: FacebookService) {
    this.initialize();
  }

  handleUserAuthenticated(user) {
    this.setUser(user);
    this.storage.set('user', JSON.stringify(user));
    this.pages = this.menuPages();
    this.openPage(this.menuPages()[0]);
  }

  menuPages() {
    return [
      {title: 'Perfil', component: ProfilePage}
    ]
  }

  initialize() {
    this.platform.ready().then(() => {
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }

      PushNotifications.start();

      AmazonS3Service.config({
        accessKeyId: 'AWS_ACCESS_KEY',
        secretAccessKey: 'AWS_SECRET_KEY'
      });

      this.facebookService.init({appId: '879700552144985', version: 'v2.5'});
    });

    this.storage = new Storage(LocalStorage);
    this.events.subscribe('user:authenticated', (args) => this.handleUserAuthenticated(args[0]));
    this.verifyIfUserIsAuthenticated();
  }

  verifyIfUserIsAuthenticated() {
    this.storage.get('user')
      .then((user) => {
        if (user) {
          this.setUser(user);
          this.pages = this.menuPages();
          this.rootPage = this.menuPages()[0].component;
        } else {
          this.rootPage = AuthenticationPage;
        }
      });
  }

  setUser(user: User) {
    this.user = user;
  }

  logout() {
    this.openPage({component: AuthenticationPage});
    this.storage.remove('user');
    // TODO I dunno why if I set it to null in the exact moment the view stays blocked
    setTimeout(() => this.user = null, 1000);
  }

  openPage(page) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
