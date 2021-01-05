import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { GenerateQuizComponent } from './components/user/generate-quiz/generate-quiz.component';
import { QuizQuestionsComponent } from './components/user/quiz-questions/quiz-questions.component';

const routes: Routes = [
  { path: 'admin', component: NavbarComponent },
  { path: 'generate-quiz', component: GenerateQuizComponent },
  { path: 'quiz', component: QuizQuestionsComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
