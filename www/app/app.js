import {App, IonicApp, Platform, Events, Storage, LocalStorage} from 'ionic/ionic';

import {AuthenticationPage} from './authentication/authentication';
import {ProfilePage} from './profile/profile';
import {FacebookIntegrationService} from './facebookIntegrationService'

@App({
  templateUrl: 'app/app.html'
})
class MyApp {
  constructor(app: IonicApp, platform: Platform, events: Events) {
    this.app = app;
    this.platform = platform;
    this.initializeApp();
    this.storage = new Storage(LocalStorage);
    this.rootPage = AuthenticationPage;
    events.subscribe('user:authenticated', (args) => this.handleUserAuthenticated(args[0]));
  }

  handleUserAuthenticated(user) {
    this.storage.set('user', user);
    this.user = user;
    this.pages = this.menuPages();
    this.openPage(this.menuPages()[0]);
  }

  menuPages() {
    return [
      {title: 'Perfil', component: ProfilePage, args: {'user': this.user}}
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }

      new FacebookIntegrationService().init({appId: '879700552144985'});
    });
  }

  loadUserAuthenticated() {
    this.user = this.storage.get('user');
    return this.user;
  }

  logout() {
    this.openPage({component: AuthenticationPage});
    this.storage.set('user', null);
    this.loadUserAuthenticated();
  }

  openPage(page) {
    if (this.app.getComponent('menu')) {
      this.app.getComponent('menu').close();
    }

    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component, page.args);
  }
}
