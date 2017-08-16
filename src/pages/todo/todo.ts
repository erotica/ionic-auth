import { Component,OnInit } from '@angular/core';
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
import { Stock } from './stock';
@IonicPage()
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
  
})

export class TodoPage implements OnInit {

  loading: any;
  todos: any;
  para: any ;
  Stocks:Stock[] =[];

  constructor(
    public navCtrl: NavController, 
    public authService: AuthService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    private toastCtrl: ToastController
    ) {}

  todoSearch() {
    this.showLoader();
    this.authService.todoSearch(this.para).then((result) => {
      this.todos = result;
      console.log(result);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }
  
  getStocks(): void {
    this.authService
        .getStocks()
        .then(Stocks => this.Stocks = Stocks);
   console.log("getStockes clicked");
   console.log(this.Stocks);
  
  }
  
  ngOnInit(): void {
   this.todoSearch();
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
