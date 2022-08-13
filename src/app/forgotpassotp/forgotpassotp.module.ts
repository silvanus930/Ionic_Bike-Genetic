import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotpassotpPageRoutingModule } from './forgotpassotp-routing.module';

import { ForgotpassotpPage } from './forgotpassotp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotpassotpPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotpassotpPage]
})
export class ForgotpassotpPageModule {}
