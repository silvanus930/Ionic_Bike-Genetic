import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BikeinfoPageRoutingModule } from './bikeinfo-routing.module';

import { BikeinfoPage } from './bikeinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BikeinfoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BikeinfoPage]
})
export class BikeinfoPageModule {}
