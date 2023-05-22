import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {email: string = '';

onSubmit() {
  // Implement your logic for password reset here
  console.log('Email:', this.email);
  // Add your password reset functionality
}
}
