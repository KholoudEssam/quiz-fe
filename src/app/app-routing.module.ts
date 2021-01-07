import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { GenerateQuizComponent } from './components/user/generate-quiz/generate-quiz.component';
import { QuizQuestionsComponent } from './components/user/quiz-questions/quiz-questions.component';
import { TestReportComponent } from './components/user/test-report/test-report.component';
import { AuthGuard } from './services/auth.guard';
import { NavComponent } from './components/admin/nav/nav.component';
import { QuestionsComponent } from './components/admin/questions/questions.component';
import { UsersComponent } from './components/admin/users/users.component';
import { QuestionFormComponent } from './components/admin/questions/question-form/question-form.component';
import { UserFormComponent } from './components/admin/users/user-form/user-form.component';
import { TestsComponent } from './components/admin/tests/tests.component';

const routes: Routes = [
  {
    path: 'admin',
    component: NavComponent,
    children: [
      { path: 'question/add', component: QuestionFormComponent },
      { path: 'question/:id', component: QuestionFormComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'tests', component: TestsComponent },
      { path: 'users/add', component: UserFormComponent },
      { path: 'users/:id', component: UserFormComponent },
      { path: 'users', component: UsersComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'generate-quiz',
    component: GenerateQuizComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz-summary',
    component: TestReportComponent,
    canActivate: [AuthGuard],
  },
  { path: 'quiz', component: QuizQuestionsComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
