import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { Observable } from "rxjs";
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users : Observable<User[]>;
  isDelete = false;
  

  constructor(private adminService: AdminService,private authService : AuthenticationService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_user_delete'))
      this.isDelete = true;
  }

  reloadData() {
    this.users = this.adminService.getList(ApiUrls.userApi);
  }

  delete(id: string) {
    this.adminService.delete(ApiUrls.userApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  
}
