import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { 

      
    }

  ngOnInit(): void {
    
   
    this.authService.sessionVerification(); 

        this.accessedPageService.insertAccessedPage("Dashboard");
        this.authService.validateTimer();
  }

}
