import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.component.html',
  styleUrls: ['./item-type.component.scss']
})
export class ItemTypeComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false;

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {
    this.authService.sessionVerification();

        this.accessedPageService.insertAccessedPage("Item-Type");
        if(this.authService.getUserRoles().includes('rl_itemtype_create'))
          this.isCreate =true;
  }

  

}
