import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})
export class UserPermissionComponent implements OnInit {

  isAdd : boolean = false;
  isCreate : boolean = false;

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {
    this.authService.sessionVerification();

    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);

        this.accessedPageService.insertAccessedPage("User-Permission");
        if(this.authService.getUserRoles().includes('rl_userpermission_create'))
          this.isCreate = true;
  }


}
