import { ItemSubtype } from './../master/item-subtype/item-subtype';
import { ApiUrls } from 'src/app/api.urls';
import { PrefixSetup } from './../admin/prefix-setup/prefix-setup';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

    result : string = "";
    prefixSetup : PrefixSetup = new PrefixSetup();
    empId : string = "";
    newEmpId : string = "";
    empPad : string = "0000";
  constructor(private adminService: AdminService) {
  }

getCreatedClient(): string
{
   /* this.adminService.get(ApiUrls.softwareConstantApi + "ClientName").subscribe(data => {
               this.result =  data.constantValue;
    }, error => console.log(error));
    */
   this.result = sessionStorage.getItem("mmsCreatedClient") || "";
    return this.result;
}

getPrefixInfo(): PrefixSetup
{
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        this.prefixSetup = data;

    }, error => console.log(error));
    
    return this.prefixSetup;

}


async generateNewEmpId()
{

   
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        
            this.prefixSetup = data;

            this.adminService.get(ApiUrls.employeeLastApi).subscribe(data => {

                this.empId = (parseInt(data.employeeOurCode.match(/\d/g).join("")) + 1).toString();
                this.empId = this.empPad.substring(0, this.empPad.length - this.empId.length) + this.empId;
                
                this.newEmpId = (this.prefixSetup.employeeOurCodePrefix + this.empId).toString();
                console.log(this.newEmpId);


            }, error => console.log(error));
    },error => console.log(error));
    
}

    async getEmpId()
{
    await this.generateNewEmpId();
    return this.newEmpId;
}


    

}