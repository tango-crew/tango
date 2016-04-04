import {App, IonicApp, Platform, Events, Storage, LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Http, XHRBackend, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {provide, Type} from 'angular2/core';
import 'rxjs/Rx';

import {AuthenticationPage} from './pages/authentication/authentication';
import {ProfilePage} from './pages/profile/profile';
import {AmazonS3Service} from './services/amazon_s3';
import {UsersService} from './services/users';
import {PushNotifications} from './services/push_notifications';
import {SpinnerHttpDecorator} from './services/spinner_http_decorator';

import {User} from './models/user';

import {S3SignedUrlPipe} from './pipes/s3-signed-url.pipe';

@App({
  templateUrl: 'build/app.html',
  providers: [
    UsersService,
    AmazonS3Service,
    provide(Storage,
      {useFactory: () => new Storage(LocalStorage)}
    ),
    provide(Http,
      {
        useFactory: (backend, defaultOptions, events, storage) => {
          return new SpinnerHttpDecorator(backend, defaultOptions, events, storage);
        },
        deps: [XHRBackend, RequestOptions, Events, Storage]
      }
    )
  ],
  pipes: [S3SignedUrlPipe],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/,
})
export class TangoApp {
  rootPage:Type;
  pages:Array<{title: string, component: Type}>;
  user:User;
  spinnerVisible:boolean = false;

  constructor(private app:IonicApp,
              private platform:Platform,
              private events:Events,
              private storage:Storage) {
    this.initialize();
  }

  private menuPages() {
    return [
      {title: 'Perfil', component: ProfilePage}
    ]
  }

  private initialize() {
    this.platform.ready().then(() => {
      if (typeof StatusBar !== 'undefined') {
        StatusBar.backgroundColorByHexString('#5CACF4');
      }

      PushNotifications.start();
    });

    this.events.subscribe('user:authenticated', (args) => this.userAuthenticated(args[0]));
    this.events.subscribe('spinner', (args) => this.spinnerVisible = args[0]);
    this.verifyIfUserIsAuthenticated();
  }

  private userAuthenticated(user) {
    this.storage.set('user', JSON.stringify(user));
    this.signIn(user);
    this.openPage(this.menuPages()[0]);
  }

  private verifyIfUserIsAuthenticated() {
    this.storage.get('user')
      .then(
        (user) => {
          if (user) {
            this.signIn(JSON.parse(user));
          } else {
            this.rootPage = AuthenticationPage;
          }
        },
        err => console.log('error to retrieve the user', err)
      );
  }

  signIn(user) {
    this.user = Object.assign(new User(), user);
    this.pages = this.menuPages();
    this.rootPage = this.pages[0].component;
  }

  logout() {
    this.openPage({component: AuthenticationPage});
    this.storage.remove('user');
    this.events.publish('user:unauthenticated', null);
    // It is necessary to wait the menu's transition
    setTimeout(() => this.user = null, 1000);
  }

  openPage(page) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
