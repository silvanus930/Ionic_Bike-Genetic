import { Component, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-selectcity',
  templateUrl: './selectcity.page.html',
  styleUrls: ['./selectcity.page.scss'],
})
export class SelectcityPage implements OnInit {

  cities : any = [];

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.loadCity();
  }

  loadCity(){
    this.masterService.getCities()
    .subscribe(data=>{
      this.cities = data;
    });
  }

}
