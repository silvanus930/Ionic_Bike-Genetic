import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform : FormGroup = new FormGroup({});
  invalidpass = false;

  constructor(
    private formbuilder : FormBuilder,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginform = this.formbuilder.group({
      'useremail': ['',[Validators.required]],
      'password': ['',Validators.required]
    });
  }

  doLogin(){

    this.userService.login(this.loginform.value)
    .subscribe(data=>{
      if(data["token"] != undefined){
        window.localStorage.setItem("token",data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        this.router.navigate(['home']);
      }else{
        this.invalidpass = true;
      }
    }, error=>{
      this.invalidpass = true;
      return error;
    });

  }

}
