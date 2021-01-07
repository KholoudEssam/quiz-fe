import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserTest } from 'src/app/models/user-test';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TestsComponent implements OnInit {
  dataSource: MatTableDataSource<UserTest>;
  isLoaded = false;
  columnsToDisplay = ['username', 'userGrade', 'op'];
  expandedElement: UserTest | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.testService.getTests().subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    });
  }

  onDelete(id) {
    let reply = confirm('are you sure you want to delete this test info?');

    if (!reply) return;

    this.testService.deleteTest(id).subscribe(
      (res) => {
        console.log(res);
        this.router
          .navigateByUrl('/admin', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/admin/tests']);
          });
      },
      (err) => {}
    );
  }
}
