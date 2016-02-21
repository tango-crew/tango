import {Page, NavController, ViewController} from 'ionic/ionic';


@Page({
  templateUrl:'app/chooseprofile/chooseprofile.html'
})
export class ChooseProfile {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }
}
