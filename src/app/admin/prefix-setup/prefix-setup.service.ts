import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ApiUrls } from 'src/app/api.urls';

@Injectable({
  providedIn: 'root'
})
export class PrefixSetupService {

  private url = ApiUrls.prefixApi;;

  constructor(private http: HttpClient) {
  }

  getpxSetup(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  addpxSetup(prefix: Object): Observable<Object> {
    return this.http.post(`${this.url}`, prefix);
  }

  deletepxSetup(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  getpxSetupList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}