import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgClass } from '@angular/common';

import { LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the TodoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
  
})

export class TodoPage {
  
  loading: any;
  stocks:Array<{id: string, title: string}>=[];

  constructor(public navCtrl: NavController, public authService: AuthService,public navParams: NavParams,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  todoSearch() {
    this.showLoader();
    this.authService.todoSearch(this.stocks).then((result) => {
      this.stocks.dismiss();
      this.stocks = result;
    
      //this.navCtrl.setRoot(TabsPage);
       console.log(result);
      
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
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
