import { UserPermission, UserGroup } from './../user-permission';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userper-list',
  templateUrl: './userper-list.component.html',
  styleUrls: ['./userper-list.component.scss']
})
export class UserperListComponent implements OnInit {

  userGroups : Observable<UserGroup[]>;
  isDelete = false;
  

  constructor(private adminService: AdminService,private authService : AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.sessionVerification();

    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_userpermission_delete'))
      this.isDelete = true;
  }

  reloadData() {
    this.userGroups = this.adminService.getList(ApiUrls.userGroupApi);
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.userGroupApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
