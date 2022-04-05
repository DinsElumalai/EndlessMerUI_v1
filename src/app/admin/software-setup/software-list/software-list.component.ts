import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { SoftwareSetup } from '../software-setup';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss']
})
export class SoftwareListComponent implements OnInit {

  softwareSetups : Observable<SoftwareSetup[]>;
  isDeleteAllowed = false;
  
  constructor(private adminService: AdminService,private authService : AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.sessionVerification();

    if(this.adminService.getUserRoles().includes('rl_software_delete'))
      this.isDeleteAllowed = true;

    this.reloadData();

  }

  reloadData() {
    this.softwareSetups = this.adminService.getList(ApiUrls.softwareApi);
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.softwareApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
