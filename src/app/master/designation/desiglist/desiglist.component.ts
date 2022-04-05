import { Designation } from './../designation';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ApiUrls } from 'src/app/api.urls';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-desiglist',
  templateUrl: './desiglist.component.html',
  styleUrls: ['./desiglist.component.scss']
})
export class DesiglistComponent implements OnInit {

  designations : Observable<Designation[]>;
  isDelete = false;
  
  constructor(private adminService: AdminService,private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.authService.sessionVerification();
    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_deisgnation_delete'))
      this.isDelete  = true;
  }

  reloadData() {
    this.designations = this.adminService.getList(ApiUrls.designationApi);
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.designationApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
