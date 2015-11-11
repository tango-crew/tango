import {App, IonicApp, Platform, Events, Storage, LocalStorage} from 'ionic/ionic';
import {Http, XHRBackend, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/angular2';


import {AuthenticationPage} from './authentication/authentication';
import {ProfilePage} from './profile/profile';
import {FacebookService} from './services/facebook'
import {UsersService} from './services/users'

@App({
  templateUrl: 'app/app.html',
  providers: [
    FacebookService,
    UsersService,
    provide(Http,
      {
        useFactory: (backend, defaultOptions) => {
          defaultOptions.headers.append('X-Tango-Api-Token', 'jD1yROsja0E59l4sK4LqPRqFSfPpIQIQ');
          defaultOptions.headers.append('Content-Type', 'application/json');
          return new Http(backend, defaultOptions);
        },
        deps: [XHRBackend, RequestOptions]
      }
    )
  ]
})
class MyApp {
  constructor(app: IonicApp, platform: Platform, events: Events, facebookService: FacebookService) {
    this.app = app;
    this.platform = platform;
    this.events = events;
    this.facebookService = facebookService;
    this.initializeApp();
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

  initializeApp() {
    this.platform.ready().then(() => {
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }

      this.facebookService.init({appId: '879700552144985'});
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

  setUser(user) {
    this.user = user;
  }

  logout() {
    this.openPage({component: AuthenticationPage});
    this.storage.remove('user');
  }

  openPage(page) {
    if (this.app.getComponent('menu')) {
      this.app.getComponent('menu').close();
    }

    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
