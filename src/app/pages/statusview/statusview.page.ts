import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AdsService } from "../../services/ads.service";
import {
  Platform,
  LoadingController,
  AlertController,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-statusview',
  templateUrl: './statusview.page.html',
  styleUrls: ['./statusview.page.scss'],
})
export class StatusviewPage implements OnInit {
  mediaUrl: any;
  mediaName: any;
  mediaExt: any;
  photoUrl: any;
  msg: any;
  constructor(
  	private activatedRoute: ActivatedRoute, 
  	private router: Router,
  	public platform: Platform, 
    public fileNavigator: File, 
    public alert: AlertController, 
    private socialSharing: SocialSharing, 
    private transfer: FileTransfer, 
    private toast: ToastController,
    private webview: WebView,
    private ads: AdsService
  	) { }

 async ngOnInit() {

 	this.mediaName = this.activatedRoute.snapshot.paramMap.get('fileName');
 	this.mediaUrl = "file:///storage/emulated/0/WhatsApp/Media/.Statuses/"+this.mediaName;
 	this.photoUrl = this.webview.convertFileSrc(this.mediaUrl);
 	this.mediaExt = this.activatedRoute.snapshot.paramMap.get('extension')
   this.ads.showAdmobBannerAdMob();
  }

   shareStory(){
    const fileData = this.mediaUrl;
    this.socialSharing.share('', '', fileData,'' ).then(() => {
        console.log("suceesfully shared");
    }).catch((e) => {
      console.log("error while sharing"+e);
    });  
  }

  downloadStory() {
    this.fileNavigator.createDir(this.fileNavigator.externalRootDirectory, 'Whatsapp khajana', false)
      .then((result) => {
        console.log('Directory created' + JSON.stringify(result));
       // this.downloadFile('Download/');
        this.downloadFile('Simple Status Saver/');
      })
      .catch((err) => {
        this.downloadFile('Simple Status Saver/');
      });

  }

   downloadFile (directoryName) {
    const url = this.mediaUrl;
    const fileTransfer: FileTransferObject = this.transfer.create();
    const fileTransferDir = this.fileNavigator.externalRootDirectory;
    const fileURL = fileTransferDir + directoryName + this.mediaName;

    fileTransfer.download(url, fileURL).then((entry) => {
      console.log('download complete: ' + entry.toURL() + ' data dir: ' + this.fileNavigator.externalRootDirectory);
      this.presentAlert();
    }, (error) => {
      console.log('Error: ' + error);
      // handle error
    });
  }

  ngOnDestroy() {
    this.mediaUrl = null;
    this.mediaName = null;
    this.mediaExt = null;
  }

  pressEvent(e, button) {
    if (button == 'share') {
      this.shareAlert();
    }
    if (button == 'download') {
     this.presentAlert();   
    }

  }

async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Download Complete',
      message: 'Downloaded to Simple Status Saver folder.',
      buttons: ['OK']
    });

    await alert.present();
    setTimeout(() => {
        this.ads.showInterstitialAdMob();
      }, 500); 
  }

  async shareAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Sharing Complete',
      message: 'Shared to selected Platform.',
      buttons: ['OK']
    });

    await alert.present();
    setTimeout(() => {
        this.ads.showInterstitialAdMob();
      }, 500); 
  }
}
