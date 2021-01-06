import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // console.log('trying to use back or forward');
      }
    });
  }
}
