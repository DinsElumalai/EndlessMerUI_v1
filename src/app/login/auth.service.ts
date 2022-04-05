import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ApiUrls } from '../api.urls';
import { User } from './login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = ApiUrls.userApi;

  constructor(private http: HttpClient) {
  }

  
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

   getUsers(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  

  
}

