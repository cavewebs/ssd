import { Injectable } from '@angular/core';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AdsService {

 	bannerAdMobId: string = 'ca-app-pub-3134770495852295/1938806700';
    interstitialAdMobId: string = 'ca-app-pub-3134770495852295/3485589990';
    videoAdMobId: string = 'ca-app-pub-3134770495852295/1074871462';

    public constructor(public alert: AlertController, private admobFree: AdMobFree) {
 
    }

    showAdmobBannerAdMob() {
        const bannerConfig: AdMobFreeBannerConfig = {
            id: this.bannerAdMobId,
            autoShow: true,
            isTesting: false,
            bannerAtTop: false,
            overlap: false
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
            .then(() => {
                // banner Ad is ready
                // if we set autoShow to false, then we will need to call the show method here
            })
            .catch(e => console.log(e));
    }

    showInterstitialAdMob() {
        const InterstitialConfig: AdMobFreeInterstitialConfig = {
            id: this.interstitialAdMobId,
            autoShow: true
        };
        this.admobFree.interstitial.config(InterstitialConfig);

        this.admobFree.interstitial.prepare()
            .then(() => {
                // interstitial Ad is ready
                // if we set autoShow to false, then we will need to call the show method here
            })
            .catch(e => console.log(e));
    }

    showVideoAdMob() {
        const freeRewardVideoConfig: AdMobFreeRewardVideoConfig = {
            id: this.videoAdMobId, // Real admob id
            //  id: 'ca-app-pub-3940256099942544/5224354917',  // Test unit id
            autoShow: true,
            isTesting: false
        };
        this.admobFree.rewardVideo.config(freeRewardVideoConfig);

        this.admobFree.rewardVideo.prepare()
            .then(() => {
                // interstitial Ad is ready
                // if we set autoShow to false, then we will need to call the show method here
            })
            .catch(e => console.log(e));
    }

    registerAdEvents() {
        document.addEventListener('onAdFailLoad', function (data) {
            console.log('error Ad: ' + JSON.stringify(data)); // adType: 'banner' or 'interstitial'
        });

        document.addEventListener('onAdLoaded', function (data) {

        });

        document.addEventListener('onAdPresent', function (data) { });
        document.addEventListener('onAdLeaveApp', function (data) { });
        document.addEventListener('onAdDismiss', function (data) { });
    }

    // async showAlert(message) {
    //     const alert = await this.alert.create({
    //         header: '',
    //         subHeader: message,
    //         buttons: ['OK']
    //     });
    //   await  alert.present();
    // }

}
