import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { UserService } from '../services/user/user.service';
import { WindowswerviceService } from '../services/windowswervice.service';

@Component({
  selector: 'app-forgotpassotp',
  templateUrl: './forgotpassotp.page.html',
  styleUrls: ['./forgotpassotp.page.scss'],
})
export class ForgotpassotpPage implements OnInit {

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  showsection:string = "enterphone";

  changepasstoken:string="";

  changepassform = new FormGroup({
    newpass:new FormControl('',[Validators.required]),
    renewpass:new FormControl('',[Validators.required,Validators.minLength(5)])
  });

  constructor(
    public ngFireAuth: AngularFireAuth,
    private windowserv : WindowswerviceService,
    private router : Router,
    private userService : UserService
  ) { }

  phonenumber:string='';



  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

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
      this.verifyotp();
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

  ngOnInit() {

  }

  verifyotp(){
    var userotp = this.OTP.first + "" + this.OTP.second + "" + this.OTP.third + "" + this.OTP.forth + "" + this.OTP.fifth + "" + this.OTP.sixth + "";

    this.userService.enterVerificationCode(userotp).then((res)=>{
      console.log(res);
      var postdata = {
        "phone":this.phonenumber
      };
      this.showsection = "changepass";
      this.userService.getchangepasstoken(postdata).subscribe((success : any)=>{
        console.log(success);
        this.changepasstoken = success.message;
      });
    });
  }

  sendotp(){

    this.userService.signInWithPhoneNumber(this.recaptchaVerifier,"+91"+this.phonenumber).then((data)=>{
    });
    this.showsection='otp';
  }

  changepassword(){
    if(this.changepassform.value.newpass == this.changepassform.value.renewpass){
      var postdata = {
        "token":this.changepasstoken,
        "newpassword":this.changepassform.value.newpass
      };
      this.userService.changepassword(postdata).subscribe((res)=>{
        this.router.navigate(['/login']);
      });
    }else{
      alert("Password not matching");
    }
  }

}
