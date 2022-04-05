import { ApiUrls } from 'src/app/api.urls';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PrefixSetup } from './../prefix-setup';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PreloadService } from 'src/app/services/preload.service';

@Component({
  selector: 'app-prefix-add',
  templateUrl: './prefix-add.component.html',
  styleUrls: ['./prefix-add.component.scss']
})
export class PrefixAddComponent implements OnInit {

  pxSetup: PrefixSetup = new PrefixSetup();
  submitted = false;
  isSuccess : boolean = false;

  constructor(private adminService: AdminService,private authService : AuthenticationService,private preloadServ : PreloadService,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    this.pxSetup.createdClient = this.preloadServ.getCreatedClient();
    
  }

newPxsetup(): void {
    this.submitted = false;
    this.pxSetup = new PrefixSetup();
  }

  save() {

    this.pxSetup.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.pxSetup.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    
    if( this.pxSetup.createdClient != null && this.pxSetup.employeeOurCodePrefix != null && this.pxSetup.financialYear != null &&
      this.pxSetup.itemOurCodePrefix != null && this.pxSetup.pdrnOurCodePrefix != null && this.pxSetup.pponOurCodePrefix &&
      this.pxSetup.rcrnOurCodePrefix != null && this.pxSetup.rpanOurCodePrefix != null && this.pxSetup.vendorOurCodePrefix != null   )
      {
            this.adminService
            .add(ApiUrls.prefixApi, this.pxSetup).subscribe(data => {
              console.log(data)
              this.pxSetup = new PrefixSetup();
              this.isSuccess = true;
              this.reloadCurrentRoute();
            }, 
            error => console.log(error));
      }
      else
        alert("All fields are mandatory...");
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
