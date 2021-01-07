import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppNgMaterialModule } from './app-ng-material.module';
import { LoginComponent } from './components/shared/login/login.component';
import { GenerateQuizComponent } from './components/user/generate-quiz/generate-quiz.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { QuizQuestionsComponent } from './components/user/quiz-questions/quiz-questions.component';
import { TestReportComponent } from './components/user/test-report/test-report.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { QuestionsComponent } from './components/admin/questions/questions.component';
import { UsersComponent } from './components/admin/users/users.component';
import { QuestionFormComponent } from './components/admin/questions/question-form/question-form.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { UserFormComponent } from './components/admin/users/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GenerateQuizComponent,
    QuizQuestionsComponent,
    TestReportComponent,
    NavComponent,
    QuestionsComponent,
    UsersComponent,
    QuestionFormComponent,
    SpinnerComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppNgMaterialModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
