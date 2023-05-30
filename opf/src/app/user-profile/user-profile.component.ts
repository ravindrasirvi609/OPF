import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient) { }

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
      about: ['', Validators.required],
      captchaInput: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.http.post('http://localhost:3000/api/student/studentdata', formData)
        .subscribe(
          (response) => {
            alert('Success!')
            this.form.reset();
            // Perform any additional actions or show success message
          },
          (error) => {
            console.error('Error saving form data:', error);
            // Handle the error or show an error message
          }
        );
    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }

}
