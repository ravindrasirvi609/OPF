import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
onSubmit() {
  if (this.form.valid) {
    console.log(this.form.value);
    
    // Form is valid, perform your logic here
  } else {
    // Form is invalid, display error messages or take appropriate action
  }}
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      country: ['India', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      aadharNo: ['', Validators.required],
      about: ['', Validators.required]
    });
  }
 
}
