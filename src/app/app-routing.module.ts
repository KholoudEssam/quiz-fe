import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { GenerateQuizComponent } from './components/user/generate-quiz/generate-quiz.component';
import { QuizQuestionsComponent } from './components/user/quiz-questions/quiz-questions.component';
import { TestReportComponent } from './components/user/test-report/test-report.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'admin', component: NavbarComponent },
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
