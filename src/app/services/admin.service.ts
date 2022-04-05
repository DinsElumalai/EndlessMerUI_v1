import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  get(apiUrl : string): Observable<any> {
    return this.http.get(`${apiUrl}`);
  }

  add(apiUrl : string, addObj: Object): Observable<Object> {
    return this.http.post(`${apiUrl}`, addObj);
  }

  update(apiUrl : string, updateObj : Object): Observable<Object>{
    return this.http.put(`${apiUrl}`, updateObj);
  }

  delete(apiUrl : string, id: any): Observable<any> {
    return this.http.delete(`${apiUrl}/${id}`, {responseType: 'text'});
  }

  getList(apiUrl : string): Observable<any> {
    return this.http.get(`${apiUrl}`);
  }

  getUserRoles() {

    return sessionStorage.getItem("mmsUserRoles") || '';
     
  }

}