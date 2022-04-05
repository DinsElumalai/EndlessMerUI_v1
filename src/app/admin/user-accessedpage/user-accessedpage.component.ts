import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-user-accessedpage',
  templateUrl: './user-accessedpage.component.html',
  styleUrls: ['./user-accessedpage.component.scss']
})
export class UserAccessedpageComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router: Router,private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    
    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);

        this.accessedPageService.insertAccessedPage("User-Accessed-Page");
  }

}
