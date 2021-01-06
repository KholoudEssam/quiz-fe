import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  authError: boolean;

  ngOnInit(): void {
    this.authError = false;
  }

  onLogin(data: NgForm) {
    this.authService.login(data.value.username, data.value.password).subscribe(
      (res) => {
        // console.log(res);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('token', res.token);

        if (res.role === 'admin') this.route.navigate(['/admin']);

        if (res.role === 'student') this.route.navigate(['/generate-quiz']);
      },
      (err) => {
        data.resetForm();
        this.authError = true;
        // console.log(err.error);
      }
    );
  }
}
