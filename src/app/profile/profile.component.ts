import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm : FormGroup

  name
  image
  email
  password
  toastText : string

  spinHide : boolean = true;
  spinHide2 : boolean = true;
  color

  constructor(private api : ApiService, private fb :  FormBuilder,private http: HttpClient,private router : Router) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.profile();
  }

  createForm(){

    this.profileForm =  this.fb.group({

      name     : ['' , Validators.required],
      email    : ['' , Validators.required],
      password : ['' , Validators.required]

    });
  }

  profile() {

          this.api.getAdminDetails().subscribe(
          admin => {

            this.name = admin.data.name
            this.email = admin.data.email

            this.profileForm.patchValue({
              name : this.name,
              email :this.email
            })

          })

  }


  updateDetails() {
    this.spinHide = false
    this.api.updateProfile(this.profileForm.value).subscribe(
      data =>{
        // console.log(data.status)
        if(data.status == 200) {
          this.toastText = "Successfully updated Profile !"
          this.color = "#cffdcc"

          // localStorage.removeItem('token');
          // this.router.navigateByUrl('login')
        }
        else{
          this.toastText = "something went wrong"
          this.color = "#fdcccc"
        }
      }
    );

    setTimeout(()=>{
      this.spinHide = true
    }, 5000);

  }

}
