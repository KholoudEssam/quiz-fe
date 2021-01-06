import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent implements OnInit, OnDestroy {
  correctAns: string;
  editMode = false;
  isLoaded = false;
  invalidData = false;
  invalidQsHead = false;
  question: Question;
  sub: Subscription;
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((res) => {
      if (res.id) {
        this.editMode = true;
        this.questionService.getQuestion(res.id).subscribe((quest) => {
          this.question = quest;
          this.question._id = res.id;
          // console.log(this.question);
          this.isLoaded = true;
        });
      } else {
        this.question = {
          _id: '',
          head: '',
          firstChoice: '',
          secondChoice: '',
          thirdChoice: '',
          forthChoice: '',
        };
        this.isLoaded = true;
      }
    });
  }
  // getSelected(choice: string) {
  //   this.correctAns = choice;
  //   console.log(choice);
  // }
  onSubmit(data: NgForm) {
    if (
      data.value.correctAnswer !== data.value.firstChoice &&
      data.value.correctAnswer !== data.value.secondChoice &&
      data.value.correctAnswer !== data.value.thirdChoice &&
      data.value.correctAnswer !== data.value.forthChoice
    )
      return (this.invalidData = true);

    if (this.editMode) {
      this.questionService
        .updateQuestion(this.question._id, data.value)
        .subscribe(
          (res) => {
            // console.log(res);
            this.router.navigate(['/admin/questions']);
          },
          (err) => {
            this.invalidQsHead = true;
          }
        );
    } else {
      this.questionService.addQuestion(data.value).subscribe(
        (res) => {
          // console.log(res);
          this.router.navigate(['/admin/questions']);
        },
        (err) => {
          this.invalidQsHead = true;
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
