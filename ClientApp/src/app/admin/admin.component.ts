import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    // Simple hardcoded validation
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginFailed = false;
      // Redirect to the viewdetails page
      this.router.navigate(['/details']);
    } else {
      this.loginFailed = true;
    }
  }
}
