import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  url = 'https://localhost:44323/api/test'

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token'),
                              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' })
  };
  
  getTests(){
    return this._http.get(this.url, this.httpOptions);
  }

  getCurrentUser(){
    return this._http.get(this.url + '/currentuser', this.httpOptions);
  }
}
