import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BikeinfoPage } from './bikeinfo.page';

const routes: Routes = [
  {
    path: '',
    component: BikeinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikeinfoPageRoutingModule {}
