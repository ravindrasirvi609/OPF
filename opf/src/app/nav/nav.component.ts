import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isLoggedIn = !this.isLoggedIn;
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout(): void {
    // Perform logout logic here, such as clearing session data, etc.
    sessionStorage.removeItem('accessToken');

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
