import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false;

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {
    this.authService.sessionVerification();

        this.accessedPageService.insertAccessedPage("Vendor");
        if(this.authService.getUserRoles().includes('rl_vendor_create'))
          this.isCreate = true;
  }

}
