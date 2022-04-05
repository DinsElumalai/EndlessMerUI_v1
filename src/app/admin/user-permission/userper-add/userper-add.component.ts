import { PreloadService } from './../../../services/preload.service';
import { UserRoles } from './../../user/user.roles';
import { UserPermission, UserGroup } from './../user-permission';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userper-add',
  templateUrl: './userper-add.component.html',
  styleUrls: ['./userper-add.component.scss']
})
export class UserperAddComponent implements OnInit {

  submitted = false;
  isSuccess : boolean = false;
  userGroup : UserGroup;
  roles : string[];

  constructor(private adminService: AdminService,private authService : AuthenticationService,
    private router: Router, private preloadServ : PreloadService) {
     }


  ngOnInit(){

    this.authService.sessionVerification();

        this.roles = UserRoles.userRoles;
        this.userGroup = new UserGroup();
        this.userGroup.createdClient = this.preloadServ.getCreatedClient();
  }

  

  save() {

    this.userGroup.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.userGroup.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    
    this.adminService
    .add(ApiUrls.userGroupApi, this.userGroup).subscribe(data => {
      console.log(data)
      this.userGroup = new UserGroup();
      this.isSuccess = true;
      this.reloadCurrentRoute();
    }, 
    error => console.log(error));
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

}
