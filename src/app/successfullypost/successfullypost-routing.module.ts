import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessfullypostPage } from './successfullypost.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfullypostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessfullypostPageRoutingModule {}
