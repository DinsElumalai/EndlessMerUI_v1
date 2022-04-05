import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-software-setup',
  templateUrl: './software-setup.component.html',
  styleUrls: ['./software-setup.component.scss']
})
export class SoftwareSetupComponent implements OnInit {

  isAdd : boolean = false;
  isCreateAllowed = false;

  constructor(private authService : AuthenticationService, private router: Router,
  private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {
    this.authService.sessionVerification();

    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);

        this.accessedPageService.insertAccessedPage("Software-Setup");
        if(this.authService.getUserRoles().includes('rl_softwaresetup_create'))
          this.isCreateAllowed = true;
  }

  

  


}
