import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registerotp',
  templateUrl: './registerotp.page.html',
  styleUrls: ['./registerotp.page.scss'],
})
export class RegisterotpPage implements OnInit {

  constructor() { }



  OTP: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: ''
  };

  otpController(event,next,prev, index){


    if(index == 6) {
      console.log("submit")
    }
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    }
 }

 verifyotp(){
  alert(this.OTP.toString());
 }

  ngOnInit() {
  }

}
