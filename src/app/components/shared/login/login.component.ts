import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  onLogin(data) {
    // this.authError = !this.authError;

    this.authService.login(data.value.username, data.value.password).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('token', res.token);

        if (res.role === 'admin') this.route.navigate(['/admin']);

        if (res.role === 'student') this.route.navigate(['/generate-quiz']);
      },
      (err) => {
        this.authError = true;
        console.log(err.error);
      }
    );
  }
}
