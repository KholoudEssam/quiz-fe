import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question, Report } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private generatedTest = new BehaviorSubject({
    testId: '',
    qsHeadAndAnswers: [],
  });
  generatedTestData = this.generatedTest.asObservable();

  private testReport = new BehaviorSubject({
    userGrade: '',
    questionsData: [],
  });
  testReportData = this.testReport.asObservable();

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  changeTest(testId, qsHeadAndAnswers: Question[]) {
    this.generatedTest.next({ testId, qsHeadAndAnswers });
  }
  changeTestReport(userGrade, questionsData: Report[]) {
    this.testReport.next({ userGrade, questionsData });
  }

  generateTest() {
    return this.http.get<{ testId; qsHeadAndAnswers }>(
      `${this.apiUrl}/tests/generate`
    );
  }

  correctTest(data) {
    return this.http.post<{ userGrade; questionsData }>(
      `${this.apiUrl}/tests/correct`,
      data
    );
  }
}
