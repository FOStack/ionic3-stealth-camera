import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  picture: any = null;

  constructor(
  public alertCtrl: AlertController,
  private cameraPreview: CameraPreview,
  public navCtrl: NavController
  ) {
    // Add permission handling...
    this.stealthPhoto();
  }





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





  stealthPhoto(){
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
    (res) => {
      this.showAlert(res, this.shoot());
    },
    (err) => {
      this.showAlert(err)
    });
  }





  shoot(){
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1600,
      quality: 100
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.showAlert(err);
    });
  }
}
