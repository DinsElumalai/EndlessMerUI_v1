import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {  Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ApiUrls } from 'src/app/api.urls';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
    logoutTimeInMin : any;
    ipAddress = '';
  
   constructor(private adminService : AdminService, private router : Router,private http:HttpClient) {
    

  }

  
  isUserLoggedIn() : boolean {
    let loggedUser =  JSON.parse(sessionStorage.getItem('mmsUser') || '{"user": "Guest"}');
    
    if (loggedUser.user != "Guest") 
     {
      // console.log(loggedUser.user);
        return true;
     }  
    else
        return false;
  }

  getUserRoles() {

    return sessionStorage.getItem("mmsUserRoles") || '';
     
  }

  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }

  setUserTimer()
  {
    let curDate = new Date();
    this.adminService.get(ApiUrls.softwareConstantApi + "LogoutTime").subscribe(data => {
               this.logoutTimeInMin =  parseInt(data.constantValue);
               
               
               localStorage.setItem("mmsLogoutTime", this.logoutTimeInMin);
               
          curDate.setMinutes(curDate.getMinutes() + this.logoutTimeInMin);
          localStorage.setItem("mmsExpireTime", curDate.toString());
               
    }, error => console.log(error));
    
  }

  

  validateTimer()
  {
    let expireTime = localStorage.getItem("mmsExpireTime") || "0";
    
    if(expireTime != "0")
    {
        let lastActiveTime = new Date(expireTime).getTime();
        let curTime = new Date().getTime();
        //console.log(new Date(localStorage.getItem("mmsExpireTime") || "0"));
        //console.log(new Date);
        //console.log(lastActiveTime);
        //console.log(curTime);

        if(curTime > lastActiveTime)
        {
          alert("Expired");
          this.router.navigate(["/logout"]);

        } 
        else{

          let curDate = new Date();
          curDate.setMinutes(curDate.getMinutes() + parseInt(localStorage.getItem("mmsLogoutTime") || "30") );
          localStorage.setItem("mmsExpireTime", curDate.toString());

        }
    }

  }

  sessionVerification()
  {
    
    if(!this.isUserLoggedIn())
        this.router.navigate(['/login']);
    
    this.validateTimer();

  }
  

}