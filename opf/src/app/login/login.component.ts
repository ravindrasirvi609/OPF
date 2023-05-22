import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
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

  constructor(private formBuilder: FormBuilder) { }


  onSubmit() {
    if (this.loginForm?.invalid) {
      return;
    }
    
    // Perform login logic here
    const username = this.loginForm?.value.username;
    const password = this.loginForm?.value.password;
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your login functionality
  }
}
