import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    const inputs = document.querySelectorAll<HTMLInputElement>(".input");

    function addcl(this: HTMLInputElement): void {
      let parent = this.parentNode?.parentNode as HTMLElement;
      parent.classList.add("focus");
    }
    
    function remcl(this: HTMLInputElement): void {
      let parent = this.parentNode?.parentNode as HTMLElement;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }
    
    inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
  }


  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }


  onSubmit() {
    if (this.loginForm?.invalid) {
      return;
    }
    
  
    // Perform login logic here
    const email = this.loginForm?.value.email;
    const password = this.loginForm?.value.password;

    this.authService.login(email, password ).subscribe(
      (response) => {        
        this.router.navigate(['/student-details']);
        console.log('Login successful:', response);
        alert("okay")
      },
      (error) => {
        console.log('Login error:', error);
        alert("not okay")
      }
    );

    console.log('email:', email);
    console.log('Password:', password);
    // Add your login functionality
  }

  
}

  function login() {
    throw new Error('Function not implemented.');
  }

