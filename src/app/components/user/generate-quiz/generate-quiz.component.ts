import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-generate-quiz',
  templateUrl: './generate-quiz.component.html',
  styleUrls: ['./generate-quiz.component.css'],
})
export class GenerateQuizComponent implements OnInit {
  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {}

  onGenerateTest() {
    this.testService.generateTest().subscribe(
      (res) => {
        console.log(res);
        this.testService.changeTest(res.testId, res.qsHeadAndAnswers);
        this.router.navigate(['/quiz']);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
