import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterotpPage } from './registerotp.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterotpPageRoutingModule {}
