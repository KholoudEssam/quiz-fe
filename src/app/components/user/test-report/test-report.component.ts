import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/models/question';
import { AuthService } from 'src/app/services/auth.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css'],
})
export class TestReportComponent implements OnInit, OnDestroy {
  sub: Subscription;
  qsData: Report[];
  userGrade: string;
  displayedColumns: string[] = ['questionHead', 'userAns', 'correctAns'];
  dataSource: MatTableDataSource<Report>;

  constructor(
    private testService: TestService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.testService.testReportData.subscribe((data) => {
      if (data.questionsData.length < 1) return this.router.navigate(['/']);
      this.qsData = data.questionsData;
      this.userGrade = data.userGrade;
      this.dataSource = new MatTableDataSource(this.qsData);
      // console.log(data.questionsData);
      // console.log(data.userGrade);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.authService.logout();
  }
}
