import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VehicleService } from '../services/vehicle.service';
import { UploadimagePage } from '../uploadimage/uploadimage.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bikeinfo',
  templateUrl: './bikeinfo.page.html',
  styleUrls: ['./bikeinfo.page.scss'],
})
export class BikeinfoPage implements OnInit {

  cityid : number = 0;
  brandslists : any = [];
  bikevariants : any = [];
  modelyears  = [];
  myDate;
  datepickershow = false;

  bikeform : FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private vehicleService : VehicleService,
    private fbuilder : FormBuilder,
    public element: ElementRef,
    public renderer: Renderer2,
    public modalController: ModalController,
    private router :  Router
    ) { }

    @ViewChild("stepone") stepone: HTMLElement;
    @ViewChild("step2") step2: HTMLElement;

    showdatepickerfun(){
      this.datepickershow = true;
    }

    ionViewDidEnter(){
      this.bikeform.reset();
      this.renderer.setStyle(this.stepone['nativeElement'], 'opacity', '1');
    this.renderer.setStyle(this.stepone['nativeElement'], 'margin-top', '0px');
    // this.renderer.setStyle(this.stepone['nativeElement'], 'display', 'none');
    this.renderer.setStyle(this.step2['nativeElement'], 'display', 'none');
    this.renderer.setStyle(this.step2['nativeElement'], 'opacity', '0');

    }

  ngOnInit() {

    this.bikeform = this.fbuilder.group({
      fbrand : ['',[Validators.required]],
      vehicle_id:['',[Validators.required]],
      vehicle_model:['',[Validators.required]],
      no_owners:['',[Validators.required]],
      insurance_lapse:[false],
      isfinance:[false],
      expect_price:[''],
      challans:[false],
      vehicle_regno:['',[Validators.required]],
      postpickdate:[''],
      postpicktime:[''],
      postpickaddrss:[''],
      postpickaltphone:['']
    });



    this.route.params.subscribe(params => {
      this.cityid = params.city;
    });

    this.getbrandsList();

    this.generateYears();

  }

  getbrandsList(){
    this.vehicleService.getvehicleBrand()
    .subscribe(data=>{
      this.brandslists = data;
      console.log(this.brandslists);
    });
  }

  getVariants(){
    this.vehicleService.getvehicleVariants(this.bikeform.value.fbrand)
    .subscribe(data=>{
      this.bikevariants = data;
    });
  }

  generateYears(){
    for(let i=1970;i<=2022;i++){
      this.modelyears.push(i);
    }
  }

  selectChange(e) {
    console.log(e);
  }

  gostep2(){
    console.log(this.stepone);
    this.renderer.setStyle(this.stepone['nativeElement'], 'opacity', '0');
    this.renderer.setStyle(this.stepone['nativeElement'], 'margin-top', '-500px');
    // this.renderer.setStyle(this.stepone['nativeElement'], 'display', 'none');
    this.renderer.setStyle(this.step2['nativeElement'], 'display', 'block');
    this.renderer.setStyle(this.step2['nativeElement'], 'opacity', '1');
  }

  async openimgmodal(){

    this.bikeform.value.city= this.cityid;
    //fe f
    console.log(this.bikeform.value);
    const modal = await this.modalController.create({
      component: UploadimagePage,
      componentProps: { bikeinfo: this.bikeform.value }
    });

    await modal.present();

  }

  setdate(date){
    this.bikeform.value.postpickdate = new DatePipe('en-US').transform(this.bikeform.value.postpickdate, 'dd-MM-yyyy');
    this.myDate = this.bikeform.value.postpickdate;
    this.datepickershow = false;
  }

}
