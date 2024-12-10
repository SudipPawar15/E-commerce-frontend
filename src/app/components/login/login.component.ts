import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    window.location.reload
  }

  onLogin(): void {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe({
      next: (response: string) => {
        console.log('JWT Token:', response);  
        localStorage.setItem('jwtToken', response);  
        localStorage.setItem('email',this.email)
        
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error', err);
        this.loginError = 'Invalid credentials';  
      }
    });
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }
}
