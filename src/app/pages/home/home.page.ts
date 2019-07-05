import { Component, ViewChild } from '@angular/core';
import { AlertController, Platform, NavParams, NavController, Events, LoadingController} from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';

import { StatusviewPage } from '../statusview/statusview.page';


import { AdsService } from "../../services/ads.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  androidPermission: boolean;
  statusLoad: boolean;
  entries: any;
  vidStatuses: any = [];
  statuses: any = [];
  nameArray: any = [];
  videoEntries: any = [];
  subCats: any = [];
  
  constructor(public navCtrl: NavController, 
    public platform: Platform, 
    public fileNavigator: File, 
    public alert: AlertController, 
    private androidPermissions: AndroidPermissions,
    private videoEditor: VideoEditor, 
    public events: Events, 
    private webview: WebView,
    private loadingCtrl: LoadingController,
    private ads: AdsService,
    ) {

    this.platform.ready().then(() => {

      // check android device permission
      this.checkPermission();
      this.loadImages();
    });
  }

  listDir(path, dirName) {
    this.fileNavigator.listDir(path, dirName)
      .then((entries) => {
        console.log("the entries", JSON.stringify(this.entries));
        this.entries = entries;
        for (var i = 0, len = entries.length; i < len; i++) {
          let fileExtension = this.nameSplit(this.entries[i].name);
          Object.assign(this.entries[i], { extension: fileExtension });

          if (this.entries[i].extension == 'mp4') {
            this.videoEntries.push(this.entries[i]);
          } else {
            let photoURL = this.webview.convertFileSrc(this.entries[i].nativeURL);
          Object.assign(this.entries[i], { photoURL: photoURL });
            this.statuses.push(this.entries[i]);
          }
        }

      //  this.checkDevicePermission();
        this.statusLoad = true;
        this.createThumbnailG(this.videoEntries, 0);
      })
      .catch(e => console.log('status not fetched' + JSON.stringify(e) ));
  }

  nameSplit(name) {
    this.nameArray = name.split('.');
    console.log(this.nameArray[1]);
    return this.nameArray[1];
  }
 
  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      (result) => {
        if (result.hasPermission) {
          this.androidPermission = true;
          this.presentLoadingWithOptions();
          let MEDIA_DIRECTORY = 'WhatsApp/Media/.Statuses';
          this.listDir('file:///storage/emulated/0/', MEDIA_DIRECTORY); 
        } else {
          this.androidPermission = false;
          this.requestPermission();
        }
      },
      err => {
        this.requestPermission();
      }
    );
  }

  requestPermission() {
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]).then (
      (result) => {
        if (result.hasPermission) {
          this.androidPermission = true;
          let MEDIA_DIRECTORY = 'WhatsApp/Media/.Statuses';
          this.listDir('file:///storage/emulated/0/', MEDIA_DIRECTORY);      
        } else {
          this.statusLoad = true;          
          this.androidPermission = false;
        }
      },
      err => {
        this.checkPermission();
        this.statusLoad = true;
      }
    );
  }

  checkDevicePermission() {
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]).then(
      (result) => {
        if (result.hasPermission) {
          this.androidPermission = true;
        } else {
          this.statusLoad = true;
          this.androidPermission = false;
        }
      },
      err => {
        this.statusLoad = true;
      }
      );
  }

  setMedia(url, fileName, extension) {
    let  mediaUrl = url;
    let  mediaName = fileName;
    let   mediaExt = extension;
    this.navCtrl.navigateForward('/statusview/'+mediaUrl+'/'+mediaName+'/'+mediaExt);
  }


  createThumbnailG(videoEntries, i) {
      let len = videoEntries.length;

      if (len) {
        let remoteFileUrl = videoEntries[i].nativeURL;
        let fileName = videoEntries[i].name;

        this.videoEditor.createThumbnail({
          fileUri: remoteFileUrl,
          outputFileName: fileName,
          atTime: 1, // optional, location in the video to create the thumbnail (in seconds)
          width: 150, // optional, width of the thumbnail
          height: 150, // optional, height of the thumbnail
          quality: 100 // optional, quality of the thumbnail (between 1 and 100)          
        }).then(
          thumbnail => {
              this.videoEntries[i].nativeURLvideo = this.webview.convertFileSrc(thumbnail);
              this.statuses.push(this.videoEntries[i]);
              if (i == len-1) {
              } else {
                i++;
                this.createThumbnailG(this.videoEntries, i);
              }
          },
          error => {
          }
          );
      }
  }

 async showAlert(message) {
    const alert = await this.alert.create({
      header: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

 openMedia(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks; 

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

 loadImages(){
    document.getElementById("imageTab").click();
    this.vidStatuses = this.statuses;
 }

async presentLoadingWithOptions() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 5000,
      message: 'Please wait...',
      showBackdrop: false,
      translucent: true,
      // cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}