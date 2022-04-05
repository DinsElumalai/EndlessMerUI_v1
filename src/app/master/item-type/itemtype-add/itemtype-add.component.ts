import { PreloadService } from './../../../services/preload.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { ItemType } from '../item-type';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-itemtype-add',
  templateUrl: './itemtype-add.component.html',
  styleUrls: ['./itemtype-add.component.scss']
})
export class ItemtypeAddComponent implements OnInit {

  itemType : ItemType = new ItemType();
  submitted = false;
  isSuccess : boolean = false; 

  constructor(private authService : AuthenticationService,private adminService: AdminService,private preloadServ : PreloadService,
    private router: Router) { }


  ngOnInit(): void {

    this.authService.sessionVerification();

    this.itemType.createdClient = this.preloadServ.getCreatedClient();
  }

  save() {

    this.itemType.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.itemType.updatedBy = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    if(this.itemType.itemTypeName != null && this.itemType.description != null)
    {
          this.adminService
          .add(ApiUrls.itemTypeApi, this.itemType).subscribe(data => {
            //console.log(data)
            this.itemType = new ItemType();
            this.isSuccess = true;
            this.reloadCurrentRoute();
          }, 
          error => console.log(error));
    }
    else
      alert("All fields are Mandatory...");
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
