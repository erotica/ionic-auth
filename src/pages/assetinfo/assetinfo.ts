import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiteinspectPage } from '../siteinspect/siteinspect';
import { InoutPage } from '../inout/inout';
import { SpecchangePage} from '../specchange/specchange';
import { MoveformPage } from '../moveform/moveform';
import { ResignreturnPage } from '../resignreturn/resignreturn';
import { LoancollectPage } from '../loancollect/loancollect';
import { RepairformPage } from '../repairform/repairform';
import { AuthService } from '../../providers/auth-service';
import { ToastController } from 'ionic-angular';

//바코드 plugin
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-assetinfo',
  templateUrl: 'assetinfo.html',
})
export class AssetinfoPage {
  results : {};
  
  barcodeoptions : BarcodeScannerOptions;
  assetinfo: any;
  para: any ;
  loading: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private barcode:BarcodeScanner, 
    public authService: AuthService,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetinfoPage');
  }
  barcodeSearch() {
    let myParams = new URLSearchParams(); 
    myParams.set('id', 'D20140209');

    this.showLoader();
    this.authService.barSearch(myParams).then((assetinfo) => {
      this.assetinfo = assetinfo;
      this.presentToast(assetinfo);
      console.log(assetinfo);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }
  //바코드 Scan
  async scanBarcode() {
    
        this.barcodeoptions = {
          prompt:'바코드를 스캔하세요'
        }
        this.results = await this.barcode.scan(this.barcodeoptions);
        console.log (this.results);
  }
  //현자검수 이동
  siteinspectpage() {
    this.navCtrl.push(SiteinspectPage);
  }
  //입출고 이동
  inoutPage() {
    this.navCtrl.push(InoutPage);
  }
  //사양변경
  specChangePage() {
      this.navCtrl.push(SpecchangePage);
  }
  //이동신청
  moveFormPage() {
    this.navCtrl.push(MoveformPage);
  }
  //사직자반납
  resignReturnPage() {
    this.navCtrl.push(ResignreturnPage);
  }
  //대여및 회수
  loanCollectPage() {
    this.navCtrl.push(LoancollectPage);
  }
  //수리신청
  repairFormPage() {
    this.navCtrl.push(RepairformPage);
  }

  showLoader() {
    console.log('ionViewDidLoad TodoPage');
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
}
