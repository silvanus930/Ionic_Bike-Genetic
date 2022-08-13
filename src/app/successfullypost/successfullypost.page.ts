import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-successfullypost',
  templateUrl: './successfullypost.page.html',
  styleUrls: ['./successfullypost.page.scss'],
})
export class SuccessfullypostPage implements OnInit {

  orderno: string;

  constructor(private route: ActivatedRoute,private platform: Platform,private router : Router) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['home']);
    });
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.orderno = params['orderno']);
  }

}
