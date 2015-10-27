import {App, IonicApp, Platform} from 'ionic/ionic';

import {AuthenticationPage} from './authentication/authentication';
import {FacebookIntegrationService} from './facebookIntegrationService'

@App({
  templateUrl: 'app/app.html'
})

class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();
    this.rootPage = AuthenticationPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }

      new FacebookIntegrationService().init({appId: '879700552144985'});
    });
  }

  openPage(page) {
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
