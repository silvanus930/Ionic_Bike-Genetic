import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessfullypostPageRoutingModule } from './successfullypost-routing.module';

import { SuccessfullypostPage } from './successfullypost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessfullypostPageRoutingModule
  ],
  declarations: [SuccessfullypostPage]
})
export class SuccessfullypostPageModule {}
