import { Component, Input, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { VehicleService } from '../services/vehicle.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse,} from 'ngx-image-compress';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.page.html',
  styleUrls: ['./uploadimage.page.scss'],
})
export class UploadimagePage implements OnInit {

  @Input() bikeinfo: any;

  awsfileupload : any = [];
  frontimg;
  rearimg;
  leftsideimg;
  rightsideimg;
  odometerimg;
  engineimg;
  fileselected:number=0;

  constructor(
    private vehicleService : VehicleService,
    private alertController : AlertController,
    private router : Router,
    private modalcontroller : ModalController,
    private platform: Platform,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit() { }

  uploadFile(file, imgside) {

    const myinstance = this;

    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIA4B425FU6OMXKD23J',
              secretAccessKey: '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',
              region: 'ap-south-1'
          }
      );
      const params = {
          Bucket: 'bikezgenie/uservehicles',
          Key:  file.name,
          Body: file,
          ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }

          myinstance.awsfileupload.push({img:data.Location, imgtype:imgside});
          console.log('Successfully uploaded file.', data);
          return true;
      });

  }


  uploadAndResize() {
    return this.imageCompress.uploadFile().then(({image, orientation}: UploadResponse) => {
      
        this.imageCompress.compressFile(image, orientation, 50, 50, 1280, 800).then(
            (result: DataUrl) => {
              //this.imgResultAfterResize = result;
              console.warn('Size in bytes is now:', this.imageCompress.byteCount(result)
              );
            }
          );
      });
  }

  
  cropFile(file)  {
        //return this.imageCompress.compressFile(file, orientation, 50, 50, 120, 80);
        return this.imageCompress.compressFile(file, orientation, 50, 50, 1280, 800);
  }
  
 
  selectFile(event, imgside) {
  
    let selectedFiles = event.target.files;
    const file = selectedFiles.item(0);
    this.fileselected++;

    if(imgside=="front"){
      const reader = new FileReader();
      reader.onload = e => this.frontimg = reader.result;
      reader.readAsDataURL(file);
    }

    if(imgside=="back"){
      const reader = new FileReader();
      reader.onload = e => this.rearimg = reader.result;
      reader.readAsDataURL(file);
    }

    if(imgside=="leftside"){
      const reader = new FileReader();
      reader.onload = e => this.leftsideimg = reader.result;
      reader.readAsDataURL(file);
    }

    if(imgside=="rightside"){
      const reader = new FileReader();
      reader.onload = e => this.rightsideimg = reader.result;
      reader.readAsDataURL(file);
    }

    if(imgside=="odometer"){
      const reader = new FileReader();
      reader.onload = e => this.odometerimg = reader.result;
      reader.readAsDataURL(file);
    }

    if(imgside=="engine"){
      const reader = new FileReader();
      reader.onload = e => this.engineimg = reader.result;
      reader.readAsDataURL(file);
    }

    // file->
    this.uploadFile(this.cropFile(file), imgside);

    //this.uploadFile(file, imgside);
  }

  postBikeDetails(){
    var usertype_id =JSON.parse(window.localStorage.getItem("user")).userTypes;
    this.bikeinfo.usertype = usertype_id;

    this.bikeinfo.postimage = this.awsfileupload;
    this.vehicleService.postVehicle(this.bikeinfo).subscribe(async (data : any)=>{
      this.modalcontroller.dismiss();
      this.router.navigate(['successfullypost', data.message]);
      
      const alert = await this.alertController.create({
          header: 'Success',
          message: 'Posted Successfully',
          buttons: [{
            text:'Ok',
            handler:()=>{
              this.modalcontroller.dismiss();
            }
          }
          ]
        });
        await alert.present();
    });
  }

}
