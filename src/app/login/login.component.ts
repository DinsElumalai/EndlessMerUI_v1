import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PreloadService } from './../services/preload.service';
import { ApiUrls } from 'src/app/api.urls';
import { AppComponent } from './../app.component';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HeaderComponent } from '../modules/header/header.component';
import { UserLog } from '../admin/user-log/user-log';
import { SidebarService } from '../services/sidebar.service';
import { AuthenticationService } from '../services/auth.service';


export class User
{
    userId : number;
    plant : string;
    createdUserId : string;
    updatedUserId : string;
    createdDate : Date;
    groupName : string;
    updatedDate : Date;
    password : string;
    active : boolean;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: number;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  user: User;
  rUser : any;
  userLog : UserLog;

  sidebarState: string;
  insertedLog : any;
  userRoles : string[];
  ipAddress : string;
  hostpath : string;

  
  

  constructor(private authService: AuthService, private router : Router,
      private adminService : AdminService, private sidebarService: SidebarService,
      private authenticationService : AuthenticationService, private preloadServ : PreloadService,
      private http : HttpClient) { 

        this.getJSON().subscribe(data => {
          console.log(data.ipAddress);
          this.ipAddress = data.ipAddress;
      });

    }

  ngOnInit(): void {

    console.log(window.location.href);
    console.log(window.location.href.substring(0,window.location.href.indexOf("mercuryMMS/login")));
    ApiUrls.baseUrl = window.location.href.substring(0,window.location.href.indexOf("mercuryMMS/login")) + "mmswebservice/api/";
    sessionStorage.setItem("mmshost", ApiUrls.baseUrl);
    console.log(ApiUrls.baseUrl);
     

  }

  public getJSON(): Observable<any> {
    return this.http.get("https://api.db-ip.com/v2/free/self");
    } 
  

  loginLog()
  {
    this.userLog = new UserLog();
    let loggedUser =  JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}');
    this.userLog.userId = loggedUser.user;
    this.userLog.logType = "Login";
    this.userLog.createdClient = this.preloadServ.getCreatedClient();
    this.userLog.userIp = this.ipAddress;

    this.adminService
    .add(ApiUrls.userLogApi, this.userLog).subscribe(data => {

      
      this.userLog = new UserLog();
      
      
    }, 
    error => console.log(error));

  }
  

  getUserRoles(groupName : string)
  {

    this.adminService
    .get(ApiUrls.userGroupApi + '/gp/' + groupName).subscribe(data => {
      //console.log(data)
      this.userRoles = new Array();
      for(let element of data)
      {
          this.userRoles.push(element.roleName);
      }

      sessionStorage.setItem('mmsUserRoles', this.userRoles.toString());

    }, 
    error => console.log(error));
  }

 
  handleLogin(){
    this.errorMessage = 'Invalid Credentials';
    this.authService.getUser(this.username).subscribe(
      result => {
               
                console.log(result);
                this.rUser = result;
              //  console.log(this.user);
              // console.log(this.user.userId);
              },
      err => {
                //console.log(err.status);
                if(err.status === 404)
                  this.errorMessage = "User doesn't Exists";
              },
      () => {
                if(this.rUser != null)
                  if(this.rUser.password === this.password)
                  {
                        sessionStorage.setItem('mmsUser', JSON.stringify({ "user" : this.username.toString()})); 
                        sessionStorage.setItem('mmsUserGroup', this.rUser.groupName);
                        sessionStorage.setItem('mmsCreatedClient', this.rUser.createdClient);
                        HeaderComponent.loggedUser = this.username.toString();
                        this.getUserRoles(this.rUser.groupName);
                        this.loginLog();
                        this.authenticationService.setUserTimer();
                        //alert("Logged in Success..");
                        this.loginSuccess = true;
                        setTimeout(() => 
                          {
                            window.location.href = "/mercuryMMS/index.html";
                            
                            
                          },
                          1000);
                        //this.router.navigate(["/dashboard"]);
                        this.sidebarService.sidebarStateObservable$
                              .subscribe((newState: string) => {
                                this.sidebarState = newState;
                              });
                  }
                  else
                        this.invalidLogin = true;
              
            else
            {
              this.errorMessage = "User doesn't Exists";
              this.invalidLogin = true;
            }
            }
    
    );

    
  }
  

}




