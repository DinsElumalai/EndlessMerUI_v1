import { PrefixSetup } from './../../../admin/prefix-setup/prefix-setup';
import { PreloadService } from './../../../services/preload.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { Vendor } from '../../vendor/vendor';
import { Designation } from '../../designation/designation';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-empadd',
  templateUrl: './empadd.component.html',
  styleUrls: ['./empadd.component.scss']
})
export class EmpaddComponent implements OnInit {

  employee : Employee = new Employee();
  submitted = false;
  isSuccess : boolean = false; 
  vendors : Vendor[];
  designations : Designation[];
  prefixSetup : PrefixSetup;
  empId : string;
  newEmpId : string;
  empPad : string = "0000";

  constructor(private adminService: AdminService,private preload : PreloadService,private authService : AuthenticationService,
    private router: Router) { 

            
    }


 ngOnInit() {

   this.authService.sessionVerification();
    this.employee = new Employee();
    
    this.generateEmpId();
    this.employee.createdClient = this.preload.getCreatedClient();
    this.getVendor();
    this.getDesignation();
    this.getEmpDuration();
    
  }

  newPxsetup(): void {
    this.submitted = false;
    
  }

  save() {

    if(this.employee.vendorId != null && this.employee.employeeName != null && this.employee.dateOfBirth != null)
    {
          this.employee.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
        this.employee.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
        console.log(this.employee);
        this.adminService
        .add(ApiUrls.employeeApi, this.employee).subscribe(data => {
          console.log(data)
          this.employee = new Employee();
          this.isSuccess = true;
          this.reloadCurrentRoute();
        }, 
        error => console.log(error));
    }
    else
      alert("Employee Name or Employee DOB or Vendor can't be Empty...");
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  reloadCurrentRoute() {
    setTimeout(() => {
            
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
    },500);
  }
  

 

  generateEmpId()
  {
    let empOurCode;
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        
      this.prefixSetup = data;

      this.adminService.get(ApiUrls.employeeLastApi).subscribe(data => {

              if(data == null || data.employeeOurCode == null)
                empOurCode = "0000";
              else
                  {
                    empOurCode = data.employeeOurCode;
                    empOurCode = empOurCode.substring(empOurCode.length - 4);
                  }
                
              this.empId = (parseInt(empOurCode) + 1).toString();
              this.empId = this.empPad.substring(0, this.empPad.length - this.empId.length) + this.empId;
              
              this.newEmpId = (this.prefixSetup.employeeOurCodePrefix + this.empId).toString();
              console.log(this.newEmpId);
            this.employee.employeeOurCode = this.newEmpId;

          }, error => console.log(error));
      },error => console.log(error));
  }
  

  getVendor()
  {
    this.adminService.getList(ApiUrls.vendorApi).subscribe(data => {
        this.vendors = data;
        this.vendors = this.vendors.filter(vnd => vnd.manPower == true);
    }, error => console.log(error));
  }

  getDesignation()
  {
    this.adminService.getList(ApiUrls.designationApi).subscribe(data => {
      this.designations = data;
  }, error => console.log(error));
  }

  getEmpDuration()
  {
    this.adminService.get(ApiUrls.softwareConstantApi + "EmployeeDuration").subscribe(data => {
      //console.log(data);
      this.employee.employeeDuration = data.constantValue;
  }, error => console.log(error));
  }

}
