import {Page, NavController, ViewController} from 'ionic/ionic';
import {Look} from '../look/look';
import {LookSimple} from '../looksimple/looksimple';
import {ProfileHairDresser} from '../profilehairdresser/profilehairdresser';
import {TakePicture} from '../takepicture/takepicture';
import {Clients} from '../data/client';

@Page({
  templateUrl:'app/timelinehairdresser/timelinehairdresser.html',
   providers: [Clients]  
})
export class TimelineHairDresser {

  constructor( clients: Clients, nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
    this.clients = clients;
    this.looks = this.clients.all();
  }

  showLook(){
    this.nav.push(Look);
  }

  showLookSimple(){
    this.nav.push(LookSimple);
  }

  showProfile(){
    this.nav.push(ProfileHairDresser);
  }

  takePicture(){
    this.nav.push(TakePicture);
  }
}
