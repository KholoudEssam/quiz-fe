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
  answerClicked = false;
  questions: Question[] = [];
  sub: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.sub = this.testService.generatedTestData.subscribe((test) => {
      console.log('from quiz questions');
      // this.questions = test.qsHeadAndAnswers;
      this.questions.push({
        head: 'A relational database developer refers to a record as',
        firstChoice: 'A criteria',
        secondChoice: 'A relation',
        thirdChoice: 'A tuple',
        forthChoice: 'An attribute',
        _id: '12345678912345',
      });
      this.questions.push({
        head: 'A relational database developer refers to a record as',
        firstChoice: 'A criteria',
        secondChoice: 'A relation',
        thirdChoice: 'A tuple',
        forthChoice: 'An attribute',
        _id: '12345678912345',
      });
      this.questions.push({
        head: 'A relational database developer refers to a record as',
        firstChoice: 'A criteria',
        secondChoice: 'A relation',
        thirdChoice: 'A tuple',
        forthChoice: 'An attribute',
        _id: '12345678912345',
      });
      this.questions.push({
        head: 'A relational database developer refers to a record as',
        firstChoice: 'A criteria',
        secondChoice: 'A relation',
        thirdChoice: 'A tuple',
        forthChoice: 'An attribute',
        _id: '12345678912345',
      });
      this.questions.push({
        head: 'A relational database developer refers to a record as',
        firstChoice: 'A criteria',
        secondChoice: 'A relation',
        thirdChoice: 'A tuple',
        forthChoice: 'An attribute',
        _id: '12345678912345',
      });
      console.log(test.testId);
      console.log(test.qsHeadAndAnswers);
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

  getAnswer(a, id) {
    this.answerClicked = true;
    console.log(a);
    console.log(id);
    console.log(this.formGroup.controls.form.value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
