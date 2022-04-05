import { PreloadService } from './../../../services/preload.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { Employee } from 'src/app/master/employee/employee';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = new User();
  submitted = false;
  isSuccess : boolean = false;
  isCreateClientReadOnly : boolean = true;
  
  employees : Employee[];
  groups : string[];

  constructor(private adminService: AdminService,private authService : AuthenticationService,private preloadServ : PreloadService,
    private router: Router) { }


  ngOnInit(): void {

   // this.user.client = this.preloadServe.getCreatedClient();
    this.user.isActive = true;
    this.getEmpCode();
    this.getGroups();
    this.authService.sessionVerification();
    this.user.createdClient = this.preloadServ.getCreatedClient();

    if(this.adminService.getUserRoles().includes('rl_user_client_edit'))
      this.isCreateClientReadOnly = false;
  }

  newPxsetup(): void {
    this.submitted = false;
    this.user = new User();
  }

  
  save() {

    this.user.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.user.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    if(this.user.userId != null && this.user.password != null && this.user.groupName != null && this.user.createdClient != null)
    {
          console.log(this.user);
          this.adminService
          .add(ApiUrls.userApi, this.user).subscribe(data => {
            console.log(data)
            this.user = new User();
            this.isSuccess = true;
            this.reloadCurrentRoute();
          }, 
          error => console.log(error));
  }
  else
    alert("User Name , Password , Group Name and Client are mandatory...");
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  reloadCurrentRoute() {
    setTimeout(() => {
            
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
    },500);
  }

  getEmpCode()
  {
    this.adminService.get(ApiUrls.employeeApi).subscribe(data => {

      this.employees = data;
    }, error => console.log(error));
  }

  getGroups()
  {
    this.adminService.get(ApiUrls.userGroupApi + "/gpnames").subscribe(data => {

      this.groups = data;
    }, error => console.log(error));
  }
}
