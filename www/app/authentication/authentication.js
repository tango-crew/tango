import {Page, NavController} from 'ionic/ionic';

@Page({
  templateUrl: 'app/authentication/authentication.html'
})
export class AuthenticationPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}
