import {Page} from 'ionic/ionic';

import {TimelineHairDresser} from '../timelinehairdresser/timelinehairdresser';
import {ProfileHairDresser} from '../profilehairdresser/profilehairdresser';
import {Look} from '../look/look';

@Page({
  templateUrl: 'app/tabs/tabs.html'
})

export class TabsPage {
  constructor() {

    this.TimelineHairDresserRoot = TimelineHairDresser;
    this.ProfileHairDresserRoot = ProfileHairDresser;
    this.LookRoot = Look;

  }
}
