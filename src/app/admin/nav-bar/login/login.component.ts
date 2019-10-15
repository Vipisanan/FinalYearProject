import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private service:AuthService) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLoginSubmit() {
    console.log(this.loginForm.value);
    // const body = new HttpParams()
    //   .set('username', this.loginForm.value.username)
    //   .set('password', this.loginForm.value.password)
    //   .set('grant_type', 'password');
    //
    // this.service.onLogin(body.toString())
    //   .subscribe(
    //     data => {
    //       // this.router.navigateByUrl('');
    //       // location.reload(); //for reload page show user name
    //       console.log(data);
    //     },
    //     error => {
    //       window.alert("user name or password error try again")
    //     });
  //

    if (this.loginForm.value.name === "admin@gmail.com" && this.loginForm.value.password === "admin"){
      localStorage.setItem('isLogin' , "yes");
      this.router.navigateByUrl('');
    }else {
      alert("user name or password error try again");
    }
  }
}
