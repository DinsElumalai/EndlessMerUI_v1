import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { AccessedPageService } from 'src/app/services/accessedPage.service';

@Component({
  selector: 'app-item-subtype',
  templateUrl: './item-subtype.component.html',
  styleUrls: ['./item-subtype.component.scss']
})
export class ItemSubtypeComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false;

  constructor(private authService : AuthenticationService, private router: Router,
    private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {
   this.authService.sessionVerification();

        this.accessedPageService.insertAccessedPage("Item-SubType");
        if(this.authService.getUserRoles().includes('rl_itemsubtype_create'))
          this.isCreate = true;
  }

}
