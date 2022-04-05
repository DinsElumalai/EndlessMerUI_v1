import { HttpClient } from '@angular/common/http';
import { PreloadService } from './../services/preload.service';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../modules/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLog } from '../admin/user-log/user-log';
import { ApiUrls } from '../api.urls';
import { AppComponent } from '../app.component';
import { SidebarService } from '../services/sidebar.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  userLog : UserLog;
  ipAddress : string;

  constructor(private adminService : AdminService, private preloadServ : PreloadService ,
     private authService : AuthService, private http : HttpClient) { 
    this.logoutLog();
    
    
  }

  ngOnInit(): void {

    

  }

  
  logoutLog()
  {
    this.userLog = new UserLog();
    let loggedUser =  JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}');
    this.userLog.userId = loggedUser.user;
    this.userLog.logType = "Logout";
    this.userLog.createdClient = this.preloadServ.getCreatedClient();
    this.userLog.userIp = this.ipAddress;

    this.adminService
    .add(ApiUrls.userLogApi, this.userLog).subscribe(data => {
     // console.log(data)
      this.userLog = new UserLog();

      
    sessionStorage.removeItem('mmsUser');
    sessionStorage.removeItem('mmsUserGroup');
    sessionStorage.removeItem('mmsUserRoles');
    sessionStorage.removeItem('mmshost');
    localStorage.removeItem("mmsExpireTime");
    localStorage.removeItem("mmsLogoutTime");
    sessionStorage.removeItem("mmsCreatedClient");
    HeaderComponent.loggedUser = "Guest";
    setTimeout(() => 
                          {
                            window.location.href = "/mercuryMMS/index.html";
                            
                          },
                          5000);

    }, 
    error => console.log(error));

  }

}
