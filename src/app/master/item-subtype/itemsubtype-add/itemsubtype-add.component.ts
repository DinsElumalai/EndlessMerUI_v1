import { PreloadService } from './../../../services/preload.service';
import { ItemSubtype } from './../item-subtype';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-itemsubtype-add',
  templateUrl: './itemsubtype-add.component.html',
  styleUrls: ['./itemsubtype-add.component.scss']
})
export class ItemsubtypeAddComponent implements OnInit {

  itemSubType : ItemSubtype = new ItemSubtype();
  submitted = false;
  isSuccess : boolean = false; 
  itemTypes : any;

  constructor(private adminService: AdminService,private authService : AuthenticationService,private preloadServ : PreloadService,
    private router: Router) { }


  ngOnInit(): void {
    this.authService.sessionVerification();

    this.getItemTypes();
    this.itemSubType.createdClient = this.preloadServ.getCreatedClient();
  }

  save() {

    this.itemSubType.createdBy = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.itemSubType.updatedBy = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    
    if(this.itemSubType.itemPrefix != null && this.itemSubType.itemSubTypeDesc != null && this.itemSubType.itemSubTypeName &&
      this.itemSubType.itemTypeId != null)
      {
            this.adminService
            .add(ApiUrls.itemSubTypeApi, this.itemSubType).subscribe(data => {
              //console.log(data)
              this.itemSubType = new ItemSubtype();
              this.isSuccess = true;
              this.reloadCurrentRoute();
            }, 
            error => console.log(error));
      }
      else
        alert("All fields are mandatory....");
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

  getItemTypes()
  {
    this.adminService.get(ApiUrls.itemTypeApi).subscribe(data => {

      this.itemTypes = data;
    }, error => console.log(error));
  }


  gotoList() {
    this.router.navigate(['/itemsubtype']);
  }
}
