import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-ppon',
  templateUrl: './ppon.component.html',
  styleUrls: ['./ppon.component.scss']
})
export class PponComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false; // need to change

  constructor(private accessedPageService : AccessedPageService,
  private authService : AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.isUserLoggedIn())
        this.router.navigate(['/login']);


        this.accessedPageService.insertAccessedPage("PPON");
        if(this.authService.getUserRoles().includes('rl_ppon_create'))
          this.isCreate = true;
  }

}
