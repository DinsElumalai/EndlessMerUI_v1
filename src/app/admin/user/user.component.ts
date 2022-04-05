import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false;

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);

        this.accessedPageService.insertAccessedPage("User");
        if(this.authService.getUserRoles().includes('rl_user_create'))
          this.isCreate =true;
  }

  

  


}
