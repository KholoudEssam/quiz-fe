import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { QuestionService } from 'src/app/services/question.service';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from 'src/app/models/question';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
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
export class QuestionsComponent implements OnInit {
  dataSource: MatTableDataSource<Question>;
  isLoaded = false;
  currentUser = '';
  // loggedInUserAuth = false;
  columnsToDisplay = ['head', 'correctAnswer', 'adminID', 'op', 'op2'];
  expandedElement: Question | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('username');
    this.questionService.getQuestions().subscribe((res) => {
      // if(localStorage.getItem('userId') === res.quests[0].adminID.username)
      this.dataSource = new MatTableDataSource(res.quests);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
      // console.log(res.quests[0].adminID.username);
    });
  }

  onDelete(id) {
    this.questionService.deleteQuestion(id).subscribe((res) => {
      this.router
        .navigateByUrl('/admin', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/admin/questions']);
        });
    });
  }
}
