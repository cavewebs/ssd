import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';
import { AdsService } from '../../services/ads.service';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {

  showSkip = true;

  @ViewChild('slides') slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: NativeStorage,
    private ads: AdsService
  ) {}

  startApp() {
    this.router.navigateByUrl('/home')
    .then(() => this.storage.setItem('ion_did_tutorial', true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.getItem('ion_did_tutorial').then(res => {
    if (res === true) {
      this.router.navigateByUrl('/home');
    }
    });
    this.menu.enable(false);
  }

  ionViewWillLeave(){
    setTimeout(() => {
        this.ads.showInterstitialAdMob();
      }, 1000);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
}
