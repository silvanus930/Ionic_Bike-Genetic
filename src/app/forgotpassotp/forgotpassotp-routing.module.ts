import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotpassotpPage } from './forgotpassotp.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotpassotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotpassotpPageRoutingModule {}
