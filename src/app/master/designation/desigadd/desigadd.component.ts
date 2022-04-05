import { PreloadService } from './../../../services/preload.service';
import { Designation } from './../designation';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-desigadd',
  templateUrl: './desigadd.component.html',
  styleUrls: ['./desigadd.component.scss']
})
export class DesigaddComponent implements OnInit {

  designation : Designation = new Designation();
  submitted = false;
  isSuccess : boolean = false;

  constructor(private adminService: AdminService,private preloadServ : PreloadService,private authService : AuthenticationService,
    private router: Router) { }


  ngOnInit(): void {
    this.authService.sessionVerification();

    this.designation.createdClient = this.preloadServ.getCreatedClient();
  }

  newPxsetup(): void {
    this.submitted = false;
    this.designation = new Designation();
  }

  reloadCurrentRoute() {
    setTimeout(() => {
            
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
    },500);
  }

  save() {

    if(this.designation.designationName != null)
    {
        this.designation.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
        this.designation.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
        
        this.adminService
        .add(ApiUrls.designationApi, this.designation).subscribe(data => {
          //console.log(data)
          this.designation = new Designation();
          this.isSuccess = true;
          this.reloadCurrentRoute();
        }, 
        error => console.log(error));
    }
    else
      alert("Designation Name is mandatory ");
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

 



}
