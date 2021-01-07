import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getQuestion(id: string) {
    return this.http.get<Question>(`${this.apiUrl}/questions/${id}`);
  }
  getQuestions() {
    return this.http.get<{ QuestionsNumber: number; quests: Question[] }>(
      `${this.apiUrl}/questions`
    );
  }
  addQuestion(data: Question) {
    return this.http.post(`${this.apiUrl}/questions`, data);
  }
  updateQuestion(id, data: Question) {
    return this.http.put(`${this.apiUrl}/questions/${id}`, data);
  }
  deleteQuestion(id) {
    return this.http.delete(`${this.apiUrl}/questions/${id}`);
  }
}
