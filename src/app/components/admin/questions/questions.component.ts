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
  columnsToDisplay = ['head', 'correctAnswer', 'adminID', 'op'];
  expandedElement: Question | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private questionService: QuestionService) {}
  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.quests);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
      // console.log(res.quests[0].adminID.username);
    });
  }
}
