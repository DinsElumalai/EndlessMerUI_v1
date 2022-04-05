import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { SoftwareSetup } from '../software-setup';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-software-add',
  templateUrl: './software-add.component.html',
  styleUrls: ['./software-add.component.scss']
})
export class SoftwareAddComponent implements OnInit {

  softwareSetup: SoftwareSetup = new SoftwareSetup();
  submitted = false;
  isSuccess : boolean = false;

  constructor(private adminService: AdminService,private authService : AuthenticationService,
    private router: Router) { }


  ngOnInit(): void {

    this.authService.sessionVerification();
  }

  newPxsetup(): void {
    this.submitted = false;
    this.softwareSetup = new SoftwareSetup();
  }

  save() {

    this.softwareSetup.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    
    if(this.softwareSetup.constantName != null && this.softwareSetup.constantValue != null)
    {
          
        this.adminService
        .add(ApiUrls.softwareApi, this.softwareSetup).subscribe(data => {
          console.log(data)
          this.softwareSetup = new SoftwareSetup();
          this.isSuccess = true;
          this.reloadCurrentRoute();
          }, 
          error => console.log(error));
    }
    else
      alert("Constant Name and Constant Value are Mandatory...");
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
}
