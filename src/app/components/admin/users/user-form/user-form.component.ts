import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  editMode = false;
  isLoaded = false;
  invalidusername = false;
  adminSelected = false;
  user: User;
  sub: Subscription;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((res) => {
      if (res.id) {
        this.editMode = true;
        this.userService.getUser(res.id).subscribe((user) => {
          this.user = user;
          this.isLoaded = true;
        });
      } else {
        this.user = { username: '', _id: '' };
        this.isLoaded = true;
      }
    });
  }
  getSelected(choice: string) {
    if (choice === 'admin') this.adminSelected = true;
    else this.adminSelected = false;
  }

  onSubmit(data: NgForm) {
    if (this.editMode) {
      this.userService.updateUser(this.user._id, data.value).subscribe(
        (userData) => {
          // console.log(userData);
          this.router.navigate(['/admin/users']);
        },
        (err) => (this.invalidusername = true)
      );
    } else {
      this.userService.addUser(data.value).subscribe(
        (res) => {
          this.router.navigate(['/admin/users']);
        },
        (err) => (this.invalidusername = true)
      );
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
