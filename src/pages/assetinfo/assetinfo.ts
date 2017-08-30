import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiteinspectPage } from '../siteinspect/siteinspect';
import { InoutPage } from '../inout/inout';

@IonicPage()
@Component({
  selector: 'page-assetinfo',
  templateUrl: 'assetinfo.html',
})
export class AssetinfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetinfoPage');
  }
  //현자검수 이동
  siteinspectpage() {
    this.navCtrl.push(SiteinspectPage);
  }
  //입출고 이동
  inoutPage() {
    this.navCtrl.push(InoutPage);
  }
}
