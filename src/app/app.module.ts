import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { AppNgMaterialModule } from './app-ng-material.module';
import { LoginComponent } from './components/shared/login/login.component';
import { GenerateQuizComponent } from './components/user/generate-quiz/generate-quiz.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { QuizQuestionsComponent } from './components/user/quiz-questions/quiz-questions.component';
import { TestReportComponent } from './components/user/test-report/test-report.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    GenerateQuizComponent,
    QuizQuestionsComponent,
    TestReportComponent,
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
