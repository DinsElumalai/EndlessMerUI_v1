import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { UserAccessedpage } from '../user-accessedpage/user-accessedpage';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-prefix-setup',
  templateUrl: './prefix-setup.component.html',
  styleUrls: ['./prefix-setup.component.scss']
})
export class PrefixSetupComponent implements OnInit {


  isAdd : boolean = false;
  isCreateAllowed : boolean = false;
  isDeleteAllowed : boolean = false;

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {
    
      this.authService.sessionVerification();

        this.accessedPageService.insertAccessedPage("Prefix-Setup");
       if( this.authService.getUserRoles().includes('rl_prefixsetup_create'))
        this.isCreateAllowed = true;
  }

  

  


}
