import { PreloadService } from './preload.service';
import { AdminService } from './admin.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ApiUrls } from '../api.urls';
import { UserAccessedpage } from '../admin/user-accessedpage/user-accessedpage';

@Injectable({
  providedIn: 'root'
})
export class AccessedPageService {

    userAccessedPage : UserAccessedpage;

  constructor(private http: HttpClient, private adminService : AdminService, private preloadServ : PreloadService ) {

    
  }

  insertAccessedPage(pageName : string)
  {
      this.userAccessedPage = new UserAccessedpage();
      this.userAccessedPage.accessedPage = pageName;
      //if(sessionStorage.getItem('mmsUser') != null)
        this.userAccessedPage.userId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
        this.userAccessedPage.createdClient = this.preloadServ.getCreatedClient();
        if(this.userAccessedPage.userId != 'Guest')
    {
            this.adminService
          .add(ApiUrls.userAccessedApi, this.userAccessedPage).subscribe(data => {
            //console.log(data)
            //userAccessedPage = new UserAccessedpage();
          }, 
          error => console.log(error));
    }
  
  }
 
}