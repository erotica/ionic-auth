import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user';

/**
 * Generated class for the AssetinspectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assetinspect',
  templateUrl: 'assetinspect.html',
})
export class AssetinspectPage {
  biguser:Array<any>;
  users: Array<{ cell:string; email:string; login: { username: string; }; picture: { thumbnail: string; }}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private user: UserService ) {

  console.log("AssetinspectPage::constructor()");
  user.getUsers( data => {
    this.biguser = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetinspectPage');
  }
 
}
