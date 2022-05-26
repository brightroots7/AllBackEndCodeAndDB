import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminLoginForm:FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  val:boolean;
  constructor(
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: ApiService,

    ) {  }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
console.log(this.returnUrl)
this.createForm();


  }

  createForm(){

    this.adminLoginForm = this.fb.group({

      email:['',Validators.compose([
        Validators.required,
        Validators.email ])],
      password:['', Validators.required]

    });
  }

  get f() {
     return this.adminLoginForm.controls;

  }

 get email()
{





    return this.adminLoginForm.controls.email
}
 get password()
{
    return this.adminLoginForm.controls.password
}



onSubmit(){
  console.log('hey');
this.submitted = true;

if (this.adminLoginForm.invalid) {
  return;
}

this.loading = true;

this.authenticationService.login(this.adminLoginForm.value.email, this.adminLoginForm.value.password)
    .subscribe(
      data => {
          console.log(data)
          this.router.navigate(["/dashboard"]);

      },
      error => {
          console.log(error)
          this.loading = false;
      });
}

}
