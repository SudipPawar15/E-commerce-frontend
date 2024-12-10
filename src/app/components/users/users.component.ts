import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  registrationError: string = '';
  registrationSuccess: string = '';

  constructor(private userService: UserService, private router:Router) {}

  onRegister(): void {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        this.registrationSuccess = 'Registration successful!';
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);  
      },
      error: (err) => {
        console.error('Registration error', err);
        this.registrationError = 'Registration failed. Please try again later.';
      }
    });
  }
}
