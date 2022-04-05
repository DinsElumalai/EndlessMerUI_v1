import { AccessedPageService } from './../../services/accessedPage.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  isAdd : boolean = false;
  isCreate = false;

  constructor(private authService : AuthenticationService, private router: Router,
                private accessedPageService : AccessedPageService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    
    this.accessedPageService.insertAccessedPage("Employee");
    if(this.authService.getUserRoles().includes('rl_employee_create'))
      this.isCreate = true;
  }

}
