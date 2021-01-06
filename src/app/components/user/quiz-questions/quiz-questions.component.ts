import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css'],
})
export class QuizQuestionsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  formArr: FormArray;

  createdForms = 0;

  questions: Question[] = [];
  testQandA = [];
  testId: string;
  sub: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.testService.generatedTestData.subscribe((test) => {
      if (test.qsHeadAndAnswers.length < 1) {
        return this.router.navigate(['/']);
      }
      this.questions = test.qsHeadAndAnswers;
      this.testId = test.testId;
    });

    this.formGroup = this._formBuilder.group({
      form: this._formBuilder.array([this.init()]),
    });
    this.addItem();
  }

  init() {
    return this._formBuilder.group({
      cont: new FormControl('', [Validators.required]),
    });
  }

  addItem() {
    if (this.createdForms < 4) {
      this.formArr = this.formGroup.get('form') as FormArray;
      this.formArr.push(this.init());
    }
    this.createdForms++;
  }

  getAnswer(questionId, questionHead, userAnswer) {
    for (let i = 0; i < this.testQandA.length; i++) {
      if (this.testQandA[i].questionId === questionId) {
        this.testQandA[i].userAnswer = userAnswer;
        return;
      }
    }
    this.testQandA.push({ questionId, questionHead, userAnswer });
  }

  submitTest() {
    const data = { testId: this.testId, testQandA: this.testQandA };
    this.testService.correctTest(data).subscribe((res) => {
      // console.log(res);
      this.testService.changeTestReport(res.userGrade, res.questionsData);
      this.router.navigate(['/quiz-summary']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
