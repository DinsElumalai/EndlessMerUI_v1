import { PreloadService } from './../../../services/preload.service';
import { Vendor } from './../vendor';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {

  vendor : Vendor = new Vendor();
  submitted = false;
  isSuccess : boolean = false; 
  prefixSetup: any;
  vendId: string;
  venPad: string = "0000";
  newVenId: any;

  constructor(private authService : AuthenticationService,private adminService: AdminService,private preloadServ : PreloadService,
    private router: Router) { }


  ngOnInit(): void {

this.authService.sessionVerification();
    
    this.vendor.createdClient = this.preloadServ.getCreatedClient();
    this.generateVendorId();
  }

  save() {

    if(this.vendor.vendorName != null && this.vendor.gstin != null)
    {
        this.vendor.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
        this.vendor.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
        
        this.adminService
        .add(ApiUrls.vendorApi, this.vendor).subscribe(data => {
          console.log(data)
          this.vendor = new Vendor();
          this.isSuccess = true;
          this.reloadCurrentRoute();
        }, 
        error => console.log(error));
    }
    else
      alert(" Vendor name and GSTIN are Mandatory...");
  }

reloadCurrentRoute() {
    setTimeout(() => {
            
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
    },500);
  }
  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  
  generateVendorId()
  {
    let vendorOurCode;
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        
      this.prefixSetup = data;

      this.adminService.get(ApiUrls.vendorLastApi).subscribe(data => {

            if(data == null || data.vendorOurCode == null)
                vendorOurCode = "0000";
            else
                {
                  vendorOurCode = data.vendorOurCode;
                  vendorOurCode = vendorOurCode.substring(vendorOurCode.length - 4);
                }

              this.vendId = (parseInt(vendorOurCode) + 1).toString();
              this.vendId = this.venPad.substring(0, this.venPad.length - this.vendId.length) + this.vendId;
              
              this.newVenId = (this.prefixSetup.vendorOurCodePrefix + this.vendId).toString();
              console.log(this.newVenId);
            this.vendor.vendorOurCode = this.newVenId;

          }, error => console.log(error));
      },error => console.log(error));
  }

}
