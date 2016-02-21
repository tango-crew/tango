import {Page, NavController, ViewController} from 'ionic/ionic';
import {Login} from '../login/login';
import {Clients} from '../data/client';
import {Look} from '../look/look';
import {LookSimple} from '../looksimple/looksimple';
import {ProfileHairDresser} from '../profilehairdresser/profilehairdresser';
import {TakePicture} from '../takepicture/takepicture';

@Page({
  templateUrl:'app/maintimeline/maintimeline.html',
   providers: [Clients]
})
export class MainTimeline {
  constructor(clients: Clients, nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
    this.clients = clients;
    this.looks = this.clients.all();
  }

  goToLogin(){
    this.nav.push(Login);
  }

  goToLook(id,typeoflook){
    this.nav.push(Login);
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
