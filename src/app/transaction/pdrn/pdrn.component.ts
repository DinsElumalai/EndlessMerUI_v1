import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-pdrn',
  templateUrl: './pdrn.component.html',
  styleUrls: ['./pdrn.component.scss']
})
export class PdrnComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false; 

  constructor(private accessedPageService : AccessedPageService,
  private authService : AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);

        this.accessedPageService.insertAccessedPage("PDRN");
        if(this.authService.getUserRoles().includes('rl_pdrn_create'))
          this.isCreate = true;
  }
}
