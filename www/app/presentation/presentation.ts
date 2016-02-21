import {Page, NavController, ViewController} from 'ionic/ionic';
import {Login} from '../login/login';
import {MainTimeline} from '../maintimeline/maintimeline';

@Page({
  templateUrl:'app/presentation/presentation.html'
})
export class Presentation {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

  goToMainTimeline(){
    this.nav.setRoot(MainTimeline);
  }
}
