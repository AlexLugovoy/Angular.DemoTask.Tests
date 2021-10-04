import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = 'https://localhost:44323/api/test'

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token'),
                              'Content-Type': 'application/json;' })
  };

  
  getQuestionsByTest(id:number){
    return this._http.get(this.url+'/'+id.toString(), this.httpOptions);
  }

  getAnswersByQuest(id:number){
    return this._http.get(this.url+'/questions/'+id.toString(), this.httpOptions);
  }

  getResult(obj:any){
    return this._http.post(this.url+'/result', obj, this.httpOptions);
  }
}
