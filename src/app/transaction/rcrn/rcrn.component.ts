import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-rcrn',
  templateUrl: './rcrn.component.html',
  styleUrls: ['./rcrn.component.scss']
})
export class RcrnComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false; 

  constructor(private accessedPageService : AccessedPageService,
  private authService : AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);


        this.accessedPageService.insertAccessedPage("RCRN");
        if(this.authService.getUserRoles().includes('rl_rcrn_create'))
          this.isCreate = true;
  }

}
