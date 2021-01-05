import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private testService: TestService
  ) {}

  ngOnInit() {
    this.sub = this.testService.generatedTestData.subscribe((test) => {
      console.log('from quiz questions');
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
    this.testQandA.push({ questionId, questionHead, userAnswer });
  }

  submitTest() {
    const data = { testId: this.testId, testQandA: this.testQandA };
    this.testService.correctTest(data).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
