import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController ,ActionSheetController,Platform } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';

//파일전송
import { File} from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';

 
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
               private filePath: FilePath,
               public loadingCtrl: LoadingController,
               private toastCtrl: ToastController,
               public actionSheetCtrl: ActionSheetController,
               public platform: Platform) {}
  
 public presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: '이미지를 선택하세요',
    buttons: [
      {
        text: 'Gallery',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();
}

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 50,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
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
    this.presentToast('Error while storing file in device dirctory.');
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
   
  async takePicture2() {
  this.camera.getPicture(this.cameraOptions).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    this.presentToast(captureDataUrl);
    console.log (captureDataUrl);
   }, (err) => {
    // Handle error
   });
}

}
