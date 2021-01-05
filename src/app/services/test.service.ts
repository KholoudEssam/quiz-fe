import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private generatedTest = new BehaviorSubject({
    testId: '',
    qsHeadAndAnswers: [],
  });
  generatedTestData = this.generatedTest.asObservable();

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  changeTest(testId, qsHeadAndAnswers: Question[]) {
    this.generatedTest.next({ testId, qsHeadAndAnswers });
  }

  generateTest() {
    return this.http.get<{ testId; qsHeadAndAnswers }>(
      `${this.apiUrl}/tests/generate`
    );
  }
}
