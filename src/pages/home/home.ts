import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions/*, CameraPreviewDimensions/**/ } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  picture: any = null; // Will hold picture data;

  constructor(
  // Using AlertController for testing purposes
  public alertCtrl: AlertController,
  private cameraPreview: CameraPreview,
  public navCtrl: NavController
  ) {
    // Adding permission handling soon...
    this.startCamera();
  }





  // This AlertController is for testing purposes only
  // It is not necesary to functionality
  showAlert(msg?, func?) {
    const alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: msg || 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [{
        text: 'OK',
        handler: () => {
          (func)?func():console.log('nothing');
        }
      }]
    });
    alert.present();
  }





  startCamera(){
    // Options for starting the camera
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear', // Or 'front'
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    // Starts the camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
    (res) => {
      this.showAlert(res, this.stealthPhoto());
    },
    (err) => {
      this.showAlert(err);
    });
  }





  stealthPhoto(){
    // Options for taking the picture
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1600,
      quality: 100
    }

    // Takes the picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.showAlert(err);
    });
  }
}
