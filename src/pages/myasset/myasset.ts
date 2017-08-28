import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';

//파일전송
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File} from '@ionic-native/file';

 
declare var cordova: any;

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
  lastImage: string = null;
  loading: any;
  options : BarcodeScannerOptions;
  results : {};

  // 사진 옵션 설정
  captureDataUrl: string;
  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private barcode:BarcodeScanner,
               private camera: Camera,
               private transfer: FileTransfer,
               private file : File,
               public loadingCtrl: LoadingController,
               private toastCtrl: ToastController) {}

  uploadImage() {
  let url = "http://mas.hist.co.kr/upload.java";
   // File for Upload
  let targetPath = this.pathForImage(this.lastImage);
  
   // File name only
   let filename = this.lastImage;
  
   var options = {
     fileKey: "file",
     fileName: filename,
     chunkedMode: false,
     mimeType: "multipart/form-data",
     params : {'fileName': filename}
   };

   const fileTransfer: FileTransferObject = this.transfer.create();
   this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
 }
 
 presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom',
    dismissOnPageChange: true
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
  
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
                 
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
   
  async takePicture() {
  this.camera.getPicture(this.cameraOptions).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    console.log (captureDataUrl);
   }, (err) => {
    // Handle error
   });
}

}
