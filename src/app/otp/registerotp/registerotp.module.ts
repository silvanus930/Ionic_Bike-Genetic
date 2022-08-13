import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterotpPageRoutingModule } from './registerotp-routing.module';

import { RegisterotpPage } from './registerotp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterotpPageRoutingModule
  ],
  declarations: [RegisterotpPage]
})
export class RegisterotpPageModule {}
