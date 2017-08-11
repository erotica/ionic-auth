import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetinfoPage } from './assetinfo';

@NgModule({
  declarations: [
    AssetinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetinfoPage),
  ],
})
export class AssetinfoPageModule {}
