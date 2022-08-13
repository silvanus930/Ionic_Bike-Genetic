import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { UserService } from '../services/user/user.service';
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WindowswerviceService } from '../services/windowswervice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerform : FormGroup = new FormGroup({});
  windowRef : any;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  shootpseection = false;

  OTP: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: ''
  };

  ionViewWillEnter(){
    this.windowRef = this.windowService.windowRef;

  }

  constructor(
    private formbuilder : FormBuilder,
    private userService : UserService,
    private router : Router,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private windowService: WindowswerviceService
  ) { }

  ngOnInit() {
    this.initForm();
  }

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

  initForm(){
    this.registerform = this.formbuilder.group({
      'username': ['',[Validators.required]],
      'useremail': ['',Validators.required],
      'userphone':['', Validators.required],
      'userpassword':['', Validators.required]
    });
  }

  doRegister(){

    this.shootpseection = true;
    // this.afAuth.signInWithPhoneNumber('919980000363').then((r)=>{

    // });

    if(this.registerform.value.userphone.length != 10)
    {
      alert("Enter valid phone number");
      return false;
    }

    this.userService.signInWithPhoneNumber(this.recaptchaVerifier,"+91"+this.registerform.value.userphone).then((r)=>{

    });



  }

  doLogin(){

    var login = {
      "useremail":this.registerform.value.useremail,
      "password":this.registerform.value.userpassword
    };



    this.userService.login(login)
    .subscribe(data=>{
      if(data["token"] != undefined){
        window.localStorage.setItem("token",data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        this.router.navigate(['home']);
      }
    }, error=>{
      return error;
    });

  }

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

    var userotp = this.OTP.first + "" + this.OTP.second + "" + this.OTP.third + "" + this.OTP.forth + "" + this.OTP.fifth + "" + this.OTP.sixth + "";

    this.userService.enterVerificationCode(userotp).then((r)=>{
      this.userService.register(this.registerform.value)
      .subscribe(data=>{
        if(data.status){
          this.router.navigate(["/login"]);
        }
      }, error=>{
        alert(error.error.message);
        console.log(error);
        return error;
      });
    }).catch((error)=>{

    });
  }

}
