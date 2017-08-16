import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TodoPage } from '../todo/todo';
import { AssetinfoPage } from '../assetinfo/assetinfo';
import { MyassetPage } from '../myasset/myasset';
import { AssetinspectPage } from '../assetinspect/assetinspect';


/** 
 * Generated class for the MainmenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainmenu',
  templateUrl: 'mainmenu.html',
})
export class MainmenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainmenuPage');
  }

  logout() {
    this.navCtrl.push(LoginPage);

  }
  todoList() {
    this.navCtrl.push(TodoPage);
  }

   asset() {
    this.navCtrl.push(AssetinfoPage);
  }

  myassetsearch() {
    this.navCtrl.push(MyassetPage); 
  }
  assetinspectpage() {
    this.navCtrl.push(AssetinspectPage);
  }

}
