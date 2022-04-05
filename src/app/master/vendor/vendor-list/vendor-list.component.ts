import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { Vendor } from '../vendor';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  vendors : Observable<Vendor[]>;
  isDelete = false;
  
  constructor(private authService : AuthenticationService,private adminService: AdminService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    this.reloadData();

    if(this.adminService.getUserRoles().includes('rl_vendor_delete'))
      this.isDelete = true;
  }

  reloadData() {
    this.vendors = this.adminService.getList(ApiUrls.vendorApi);
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.vendorApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
