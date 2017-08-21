import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MyassetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myasset',
  templateUrl: 'myasset.html',
})
export class MyassetPage {

  options : BarcodeScannerOptions;
  results : {};

  options2: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private barcode:BarcodeScanner,
               private camera: Camera) {}
                 
  async scanBarcode() {

    this.options = {
      prompt:'Scan a barcode to see the result!'
    }
    this.results = await this.barcode.scan(this.options);
    console.log (this.results);
  }

  async encodeData() {
    const result = await this.barcode.encode(this.barcode.Encode.TEXT_TYPE,'http://learnionic2.com')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyassetPage');
  }
   
  async cameraTaken() {
  this.camera.getPicture(this.options2).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
   }, (err) => {
    // Handle error
   });
}

}
