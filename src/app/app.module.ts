import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService} from '../providers/auth-service';
import { UserService } from '../providers/user';

import { LoginPage } from '../pages/login/login';
import { RegisterPage} from '../pages/register/register'
import { MainmenuPage } from '../pages/mainmenu/mainmenu';
import { TodoPage} from '../pages/todo/todo';
import { AssetinfoPage } from '../pages/assetinfo/assetinfo';
import { MyassetPage } from '../pages/myasset/myasset';
import { AssetinspectPage } from '../pages/assetinspect/assetinspect';
import { TodoDetailPage } from '../pages/todo-detail/todo-detail';

import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { File } from '@ionic-native/file';
import { FilePath} from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MainmenuPage,
    TodoPage,
    AssetinfoPage,
    MyassetPage,
    AssetinspectPage,  
    TodoDetailPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    MainmenuPage,
    TodoPage,
    AssetinfoPage,
    MyassetPage,
    AssetinspectPage,
    TodoDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OAuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserService,
    Camera,
    BarcodeScanner
  ]
})
export class AppModule {}
