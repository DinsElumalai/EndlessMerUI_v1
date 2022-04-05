import { PreloadService } from './../../../services/preload.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { Item } from '../item';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-itemadd',
  templateUrl: './itemadd.component.html',
  styleUrls: ['./itemadd.component.scss']
})
export class ItemaddComponent implements OnInit {

  item : Item = new Item();
  submitted = false;
  isSuccess : boolean = false; 
  prefixSetup: any;
  itmId: string;
  newItmId: string;
  itmOurTypeId: string;
  newItmOurTypeId: string;
  itmPad: string = "0000";
  vendors : any;
  itemTypes : any;
  itemSubTypes : any;
  itemSubTypePrefix : any;

  constructor(private adminService: AdminService,private authService : AuthenticationService,private preloadServ : PreloadService,
    private router: Router) { }


  ngOnInit(): void {
    this.authService.sessionVerification();

    this.item.createdClient = this.preloadServ.getCreatedClient();
    this.generateItemId();
    this.getVendors();
    this.getItemTypes();
    //this.getItemSubTypes();
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

    this.item.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.item.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    
    if(this.item.itemOurTypeCode != null && this.item.itemNumber != null && this.item.itemName &&
      this.item.itemNameId)
      {
          this.item.itemDescription = this.item.itemNameId + this.item.vendorId;
          this.adminService
          .add(ApiUrls.itemApi, this.item).subscribe(data => {
            //console.log(data)
            this.item = new Item();
            this.isSuccess = true;
            this.reloadCurrentRoute();
          }, 
          error => console.log(error));
      }
      else
        alert("Item Our Type Code , Item Number and Item Name are mandatory...");
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/item']);
  }

  getItemTypes()
  {
    this.adminService.get(ApiUrls.itemTypeApi).subscribe(data => {
               this.itemTypes =  data;
    }, error => console.log(error));
  }

  getItemSubTypes()
  {
    this.adminService.get(ApiUrls.itemSubTypeByTypeIdApi + this.item.itemTypeId).subscribe(data => {
               this.itemSubTypes =  data;
    }, error => console.log(error));
  }

  

  getVendors()
  {
    this.adminService.get(ApiUrls.vendorApi).subscribe(data => {

      this.vendors = data;
    }, error => console.log(error));
  }

  generateItemOurTypeCode()
  {
    let lastItemTypeCode;
    console.log(this.item.itemSubTypeId);
    this.adminService.get(ApiUrls.itemSubTypeApi + "/" + this.item.itemSubTypeId).subscribe(result => {

          this.itemSubTypePrefix = result.itemPrefix;
          console.log(this.itemSubTypePrefix);

      this.adminService.get(ApiUrls.itemBySubTypeIdApi + this.item.itemSubTypeId).subscribe(result => {

              //console.log(result);
              if(result == null || result.itemOurTypeCode == null)
                lastItemTypeCode = "0000";
              else
                {
                  lastItemTypeCode = result.itemOurTypeCode;
                  lastItemTypeCode = lastItemTypeCode.substring(lastItemTypeCode.length - 4);
                }
              
              this.itmOurTypeId = (parseInt(lastItemTypeCode) + 1).toString();
              this.itmOurTypeId = this.itmPad.substring(0, this.itmPad.length - this.itmOurTypeId.length) + this.itmOurTypeId;
              
              this.newItmOurTypeId = (this.itemSubTypePrefix + this.itmOurTypeId).toString();
              console.log(this.newItmOurTypeId);
              //console.log(this.newItmId);
            this.item.itemOurTypeCode = this.newItmOurTypeId;

          }, error => console.log(error));
          }, error => console.log(error));
  }
  generateItemId()
  {
    let itemOurCode : string;
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        
      this.prefixSetup = data;

      this.adminService.get(ApiUrls.itemLastApi).subscribe(result => {

              //console.log(result);
              //console.log(result.itemOurCode.match(/\d/g));
              if(result == null || result.itemOurCode == null)
                itemOurCode = "0000";
            else
            {
                itemOurCode = result.itemOurCode;
                itemOurCode = itemOurCode.substring(itemOurCode.length - 4);
                //console.log(itemOurCode);
            }
                
              this.itmId = (parseInt(itemOurCode) + 1).toString();
              this.itmId = this.itmPad.substring(0, this.itmPad.length - this.itmId.length) + this.itmId;
              //console.log(this.itmId);
              this.newItmId = (this.prefixSetup.itemOurCodePrefix + this.itmId).toString();
              //console.log(this.newItmId);
            this.item.itemOurCode = this.newItmId;

          }, error => console.log(error));
      },error => console.log(error));
  }

}
