import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  confirmationResult: firebase.auth.ConfirmationResult;


  constructor(private http: HttpClient,private config : Constants,private fireAuth: AngularFireAuth) { }

  login (logindata:any){
    return this.http.post<any>(this.config.LOGINURL,logindata);
  }

  register(registerdata:any){
    return this.http.post<any>(this.config.APIURL+"register",registerdata);
  }

  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    return new Promise<any>((resolve, reject) => {

      this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error) => {
          console.log(error);
          reject('SMS not sent');
        });
    });
  }

  public async enterVerificationCode(code) {
    // alert(code);
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        // return result;
        console.log(result);
        const user = result.user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });

    });
  }

  getchangepasstoken(postdata:any){
    return this.http.post(this.config.FORGOTPASS+"confirmpassreset",postdata);
  }

  changepassword(postdata:any){
    return this.http.post(this.config.FORGOTPASS+"forgotpass",postdata);
  }

}
