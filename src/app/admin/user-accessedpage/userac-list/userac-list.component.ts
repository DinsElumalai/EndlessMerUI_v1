import { AuthenticationService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserAccessedpage } from '../user-accessedpage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-userac-list',
  templateUrl: './userac-list.component.html',
  styleUrls: ['./userac-list.component.scss']
})
export class UseracListComponent implements OnInit {

  userAccessedPages : Observable<UserAccessedpage[]>;
  isDelete = false;
  
  constructor(private adminService: AdminService,private authService : AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.sessionVerification();

    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_useraccessedpage_delete'))
      this.isDelete = true;
  }

  reloadData() {
    this.userAccessedPages = this.adminService.getList(ApiUrls.userAccessedApi);
    this.userAccessedPages = this.userAccessedPages.pipe(map((data) => {
      data.sort((a, b) => {
          return a.recId > b.recId ? -1 : 1;
       });
      return data;
      }))
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.userAccessedApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
