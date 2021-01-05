import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/models/question';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css'],
})
export class TestReportComponent implements OnInit, OnDestroy {
  sub: Subscription;
  qsData: Report[];
  items = [1, 2, 3, 4, 5];
  userAnswer: string;
  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.sub = this.testService.testReportData.subscribe((data) => {
      this.qsData = data.questionsData;
      this.userAnswer = data.userGrade;
      console.log(data.questionsData);
      console.log(data.userGrade);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
