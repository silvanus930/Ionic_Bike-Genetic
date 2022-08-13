import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild("header") header: HTMLElement;
  @ViewChild("tbar") tbar: HTMLElement;

  testiOpts = {
    pager: false,
    autoplay:true
  };

  logineduser:any;

  silderoptions = {
    pager: false,
    autoplay:true
  };

  constructor(private menu: MenuController,
    public element: ElementRef,
    public renderer: Renderer2
    ) {
      if(window.localStorage.getItem('user') != null)
        this.logineduser = JSON.parse(window.localStorage.getItem('user'));

    }

    ionViewWillEnter() {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'margin-top 200ms');
    }

    onContentScroll(event) {
      if (event.detail.scrollTop >= 50) {
        this.renderer.setStyle(this.header['el'], 'margin-top', '-90px');
      } else {
        this.renderer.setStyle(this.header['el'], 'margin-top', '0px');
      }
    }

  opencloseNav(){
    this.menu.toggle().then((data)=>{
      console.log(data);
    });
  }



}
