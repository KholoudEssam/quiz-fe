import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from 'src/app/models/question';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  isLoaded = false;
  columnsToDisplay = ['username', 'email', 'role', 'op', 'op2'];
  expandedElement: Question | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      // console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    });
  }
  onDelete(id) {
    let reply;

    if (localStorage.getItem('userId') === id) {
      reply = confirm('are you sure you want to delete your account?');
      if (!reply) return;
    }

    this.userService.deleteUser(id).subscribe(
      (res) => {
        if (reply) {
          this.authService.logout();
          this.router.navigate(['/']);
          return;
        }
        this.router
          .navigateByUrl('/admin', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/admin/users']);
          });
      },
      (err) => {}
    );
  }
}
