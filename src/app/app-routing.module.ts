import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'selectcity',
    loadChildren: () => import('./selectcity/selectcity.module').then( m => m.SelectcityPageModule)
  },
  {
    path: 'bikeinfo/:city',
    loadChildren: () => import('./bikeinfo/bikeinfo.module').then( m => m.BikeinfoPageModule)
  },
  {
    path: 'uploadimage',
    loadChildren: () => import('./uploadimage/uploadimage.module').then( m => m.UploadimagePageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'registerotp',
    loadChildren: () => import('./otp/registerotp/registerotp.module').then( m => m.RegisterotpPageModule)
  },
  {
    path: 'forgotpassotp',
    loadChildren: () => import('./forgotpassotp/forgotpassotp.module').then( m => m.ForgotpassotpPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'successfullypost/:orderno',
    loadChildren: () => import('./successfullypost/successfullypost.module').then( m => m.SuccessfullypostPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
