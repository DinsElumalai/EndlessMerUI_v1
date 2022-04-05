import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ApiUrls } from 'src/app/api.urls';
import { Employee } from './../employee';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.scss']
})
export class EmplistComponent implements OnInit {

  employees : Observable<Employee[]>;
  isDelete = false;
  
  constructor(private adminService: AdminService,private authService : AuthenticationService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_employee_delete'))
      this.isDelete = true;
  }

  reloadData() {
    this.employees = this.adminService.getList(ApiUrls.employeeApi);
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.employeeApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
