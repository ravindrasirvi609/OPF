import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm?.invalid) {
      return;
    }

    // Perform registration logic here
    const username = this.registrationForm?.value.username;
    const email = this.registrationForm?.value.email;
    const password = this.registrationForm?.value.password;
    const confirmPassword = this.registrationForm?.value.confirmPassword;
    this.authService.register({
      username,
      email,
      password,
      confirmPassword
    }).subscribe(
      (response) => {
        // Handle successful registration
        alert("okay")
        console.log('Registration successful:', response);
        // You can navigate to a success page or perform any other actions
      },
      (error) => {
        // Handle registration error
        console.log('Registration error:', error);
        // You can display an error message to the user or perform any other actions
      }
    );
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Add your registration functionality
  }
}
