import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { Router } from '@angular/router';
import { AdsService } from './services/ads.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Latest',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My saved Items',
      url: '/list',
      icon: 'list'
    },
    {
      title: '------------------------',
      icon: ''
    },
    {
      title: 'Other Apps by Me',
      url: '/myapps',
      icon: 'appstore'
    },
    // {
    //   title: 'About Me',
    //   url: '/about',
    //   icon: 'globe'
    // },
    {
      title: 'Help',
      url: '/help',
      icon: 'help'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public fileNavigator: File,
    private statusBar: StatusBar,
    public share: SocialSharing,
    public alert: AlertController,
    public menu: MenuController,
    public router: Router,
    private ads: AdsService,
    public storage: NativeStorage,
    private appRate: AppRate
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.deletePreviousThumbnailFiles();
    });
  }

  deletePreviousThumbnailFiles() {
    this.fileNavigator.removeRecursively(this.fileNavigator.externalApplicationStorageDirectory + 'files/files/', 'videos').
      then((result) => {
        console.log('Directory deleted' + JSON.stringify(result));
      }).
      catch((err) => {
        console.log('Directory not deleted' + JSON.stringify(err));
      });
  }

  shareApp(){
    // tslint:disable-next-line:max-line-length
    this.share.share('Check out this app that allows you download and share your contacts WhatsApp Status', 'Check out this app that allows you download and share your contacts WhatsApp Status', '', 'https://play.google.com/store/apps/details?id=app.cavewebs.simplestatusdownloader' ).then(() => {
        setTimeout(() => {
        this.ads.showInterstitialAdMob();
      }, 1000);
        console.log('suceesfully shared');
    }).catch((e) => {
      console.log('error while sharing' + e);
    });
  }

  rateApp(){
   this.appRate.preferences.storeAppURL = {
  // ios: '<app_id>',
      android: 'market://details?id=app.cavewebs.simplestatusdownloader',
    };
   this.appRate.promptForRating(true);
  }

  pressEvent(e, button) {
    if (button === 'share') {
      this.shareAlert();
    }
    if (button === 'rate') {
     this.presentAlert();
    }

  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Rate App',
      subHeader: 'Rated Successfully',
      message: 'Thank you for rating our app. We do hope you gave us a 5-Star',
      buttons: ['OK']
    });
    await alert.present();
  }

  async shareAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Sharing Complete',
      message: 'Shared to selected Platform.',
      buttons: ['OK']
    });
    await alert.present();
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.setItem('ion_did_tutorial', false);
    this.router.navigateByUrl('/help');
  }
}
