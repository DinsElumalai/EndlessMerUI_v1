import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss']
})
export class UserLogComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {
    this.authService.sessionVerification();
    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);

        this.accessedPageService.insertAccessedPage("User-Log");
  }

 


  

}
