import { AuthenticationService } from './../../../services/auth.service';
import { PreloadService } from './../../../services/preload.service';
import { NoteSlip } from './../../noteslip';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ApiUrls } from 'src/app/api.urls';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Employee } from 'src/app/master/employee/employee';
import { Item } from 'src/app/master/item/item';
import { Vendor } from 'src/app/master/vendor/vendor';
import { PrefixSetup } from 'src/app/admin/prefix-setup/prefix-setup';

@Component({
  selector: 'app-add-rcrn',
  templateUrl: './add-rcrn.component.html',
  styleUrls: ['./add-rcrn.component.scss']
})
export class AddRcrnComponent implements OnInit {

  noteSlip : NoteSlip = new NoteSlip();
  submitted = false;
  isSuccess : boolean = false;
  employees : Employee[];
  machineItems : Item[];
  partItems : Item[];
  materialItems : Item[];
  vendors : Vendor[];
  qryString : String;
  lastTransaction : NoteSlip;
  isMismatchAvailable : boolean = false;
  prefixSetup : PrefixSetup;
  reqCatId : string;
  newReqCatId : string;
  reqPad : string = "00000";
  canInsert : boolean = false;
  isTxnCatagory : boolean = false;
  isTransactionCategory : boolean = false;
  isDanger : boolean = false;
  dangerAlertMsg : string;
  isSubmitEnabled : boolean = true;

  partItemText : string;
  machineItemText : string;
  issueToVendorText : string;
  materialText : string;

  constructor(private adminService: AdminService, private router: Router,
     private preloadServ : PreloadService, private authService : AuthenticationService) { }

  ngOnInit(): void {

    this.noteSlip.transactionCategory = "Actual";
    this.noteSlip.requisitionCategory = "RCRN";
    this.noteSlip.verified = false;
    this.noteSlip.noteSlipDate = new Date().toISOString().slice(0,10);
    this.generateRequesitionCode();
    this.getEmpCode();
    this.getItems();
    this.getVendors();

    if(this.authService.getUserRoles().includes('rl_rcrn_transactioncategory'))
          this.isTransactionCategory = true;
    
  }

  save() {

    this.canInsert = true;

    this.noteSlip.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.noteSlip.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.noteSlip.createdClient = this.preloadServ.getCreatedClient();
    this.noteSlip.takenWt = 0;
    this.noteSlip.takenNos = 0;

    this.noteSlip.okayWt = parseFloat(Number(this.noteSlip.okayWt).toFixed(4));
    this.noteSlip.openingWt = parseFloat(Number(this.noteSlip.openingWt).toFixed(4));
    this.noteSlip.stockWt = parseFloat(Number(this.noteSlip.stockWt).toFixed(4));
    this.noteSlip.mismatchWt = parseFloat(Number(this.noteSlip.mismatchWt).toFixed(4));
    this.noteSlip.takenWt = parseFloat(Number(this.noteSlip.takenWt).toFixed(4));
    this.noteSlip.directTakenWt = parseFloat(Number(this.noteSlip.directTakenWt).toFixed(4));
    this.noteSlip.pendingTakenWt = parseFloat(Number(this.noteSlip.pendingTakenWt).toFixed(4));
    this.noteSlip.rejectedWt = parseFloat(Number(this.noteSlip.rejectedWt).toFixed(4));
    this.noteSlip.unitWtGms = parseFloat(Number(this.noteSlip.unitWtGms).toFixed(4));
    this.noteSlip.wtMcAverage1Gms = parseFloat(Number(this.noteSlip.wtMcAverage1Gms).toFixed(4));
    this.noteSlip.wtMcAverage2Gms = parseFloat(Number(this.noteSlip.wtMcAverage2Gms).toFixed(4));

    if(this.noteSlip.operatorEmployeeId == null || this.noteSlip.operatorEmployeeId == "")
    {
      alert("Operator is missing....");
      this.canInsert = false;
    }
    if(this.noteSlip.partItemId == null || this.noteSlip.partItemId == "")
    {
      this.canInsert = false;
      alert("Part Item Id is mandatory...");
    }
    if(this.noteSlip.machineItemId == null || this.noteSlip.machineItemId == "")
    {
      this.canInsert = false;
      alert("Machine Item Id is mandatory...");
    }
    if(!(this.noteSlip.partItemId != null && this.noteSlip.issueToVendorId != null))
    { 
       alert("Part Item Id and Issue Vendor id are mandatory...");
       this.dangerAlertMsg = "Part Item Id and Issue Vendor id are mandatory...";
       this.isDanger = true;
    }
    if(this.noteSlip.rejectedNos > 0) 
    {
      if(!(this.noteSlip.rejectedWt > 0 && this.noteSlip.rejectedReason != null))
      {
        this.canInsert = false;
        alert("Rejected Weight is required..");
      }
    } 
    if(this.noteSlip.transactionCategory == 'Actual')
    {
      if(!(this.noteSlip.okayNos > 0 || this.noteSlip.rejectedWt > 0))
      { this.canInsert = false;
        alert("Okay Nos or Rejection Wt is Required..");
      }
    }
    
    if(this.noteSlip.rejectedWt > 0 && this.noteSlip.rejectedReason == null)
    {  
      this.canInsert = false;
      alert("Rejected Reason is required...");
    }
      if(this.canInsert)
        {    
          this.isSubmitEnabled = false;
          
          this.adminService
          .add(ApiUrls.transactionApi, this.noteSlip).subscribe(data => {
            //console.log(data)
            this.noteSlip = new NoteSlip();
            this.isSuccess = true;
            this.reloadCurrentRoute();
          }, 
          error => console.log(error));
        }
    
  }
  
 
 

  getLastTransaction()
  {
    this.qryString =  '/' + this.noteSlip.partItemId + '/' + this.noteSlip.issueToVendorId + '/' + this.noteSlip.requisitionCategory;
    this.adminService.get(ApiUrls.transRcrnLastApi + this.qryString ).subscribe(data => {
      
      console.log(data);
      this.lastTransaction = data;
      if(data == null)
      {
        this.noteSlip.stockNos = 0;
        this.noteSlip.stockWt = 0;
        this.noteSlip.openingNos = 0;
        this.noteSlip.openingWt = 0;
        this.noteSlip.mismatchNos = 0;
        this.noteSlip.mismatchWt = 0;
        this.noteSlip.takenNos = 0;
        this.noteSlip.takenWt = 0;
        this.noteSlip.directTakenNos = 0;
        this.noteSlip.directTakenWt = 0;
        this.noteSlip.pendingTakenNos = 0;
        this.noteSlip.pendingTakenWt = 0;
      }
      else
      {
        this.noteSlip.stockNos = this.lastTransaction.openingNos + this.lastTransaction.okayNos - (this.lastTransaction.takenNos + this.lastTransaction.directTakenNos + this.lastTransaction.pendingTakenNos) + this.lastTransaction.mismatchNos;
        this.noteSlip.stockWt = this.lastTransaction.openingWt + this.lastTransaction.okayWt - (this.lastTransaction.takenWt + this.lastTransaction.directTakenWt + this.lastTransaction.pendingTakenWt) + this.lastTransaction.mismatchWt;
        this.noteSlip.openingNos = this.lastTransaction.openingNos + this.lastTransaction.okayNos - this.lastTransaction.takenNos;
        this.noteSlip.openingWt = this.lastTransaction.openingWt + this.lastTransaction.okayWt - this.lastTransaction.takenWt;
        this.noteSlip.mismatchNos = 0;
        this.noteSlip.mismatchWt = 0;
        this.noteSlip.takenNos = this.lastTransaction.takenNos;
        this.noteSlip.takenWt = this.lastTransaction.takenWt;
        this.noteSlip.directTakenNos = this.lastTransaction.directTakenNos;
        this.noteSlip.directTakenWt = this.lastTransaction.directTakenWt;
        this.noteSlip.pendingTakenNos = this.lastTransaction.pendingTakenNos;
        this.noteSlip.pendingTakenWt = this.lastTransaction.pendingTakenWt;
        this.isMismatchAvailable = true;
      }

    }, error => console.log(error));
  }

  setMismatchData()
  {
    if(this.isMismatchAvailable)
    {
      this.noteSlip.mismatchNos = this.lastTransaction.mismatchNos + this.noteSlip.adjustNos;
      this.noteSlip.mismatchWt = this.lastTransaction.mismatchWt + this.noteSlip.adjustWt;
    }
  }

  getEmpCode()
  {
    this.adminService.get(ApiUrls.employeeApi).subscribe(data => {
      
      this.employees = data;
    }, error => console.log(error));
  }

  displayIssueToVendor()
  {
    let id = this.noteSlip.issueToVendorId;
    if(this.vendors.filter(vendor => vendor.vendorId === Number(id)).length > 0)
    {
      let ipVendor = this.vendors.filter(vendor => vendor.vendorId === Number(id))[0];
      this.issueToVendorText = ipVendor.vendorNameId + " - " + ipVendor.vendorName ;
    }
    else
    {
      this.issueToVendorText = "";
      this.noteSlip.issueToVendorId = "";
    }
    
  }
  displayMaterial()
  {
    let id = this.noteSlip.rawMaterialItemId;
    if(this.materialItems.filter(item => item.itemId === Number(id)).length > 0)
    {
      let materialItem = this.materialItems.filter(item => item.itemId === Number(id))[0];
      this.materialText = materialItem.itemNameId + " - " + materialItem.itemNumber + " - " + materialItem.itemName;
    }
    else
    {
      this.materialText = "";
      this.noteSlip.rawMaterialItemId = "";
    }
  }
  
  getVendors()
  {
    this.adminService.get(ApiUrls.vendorApi).subscribe(data => {
      
      this.vendors = data;
      this.vendors = this.vendors.filter(vendor => vendor.jobWork == true);
    }, error => console.log(error));
  }

  displayPartItem()
  {
    let id = this.noteSlip.partItemId;
    if(this.partItems.filter(item => item.itemId === Number(id)).length > 0)
    {
      let partItem = this.partItems.filter(item => item.itemId === Number(id))[0];
      this.partItemText = partItem.itemNameId + " - " + partItem.itemNumber + " - " + partItem.itemName;
    }
    else
    {
      this.partItemText = "";
      this.noteSlip.partItemId = "";
    }
  }
  displayMachineItem()
  {
   
    let id = this.noteSlip.machineItemId;
    if(this.machineItems.filter(item => item.itemId === Number(id)).length > 0)
    {
        let machineItem = this.machineItems.filter(item => item.itemId === Number(id))[0];
        this.machineItemText = machineItem.itemNameId + " - " + machineItem.itemNumber + " - " + machineItem.itemName;
    }
    else
     {
      this.machineItemText = "";
      this.noteSlip.machineItemId = "";
     }
  }

  getItems()
  {
    this.adminService.get(ApiUrls.itemApi).subscribe(data => {
      
      this.machineItems = data;
      this.machineItems = this.machineItems.filter( machineItem => machineItem.itemTypeId == "3");
      this.partItems = data;
      this.partItems = this.partItems.filter(partItem => partItem.itemTypeId == "1");
      this.materialItems = data;
      this.materialItems = this.materialItems.filter(materialItem => materialItem.itemTypeId == "2");

    }, error => console.log(error));
  }

  generateRequesitionCode()
  {
    let requesitionOurCode;
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        
      this.prefixSetup = data;

      this.adminService.get(ApiUrls.transLastCodeApi + '/RCRN').subscribe(data => {

            if(data == null || data.requisitionCategoryOurCode == null)
               requesitionOurCode = "00000";
            else
            {   requesitionOurCode = data.requisitionCategoryOurCode;
                requesitionOurCode = requesitionOurCode.substring(requesitionOurCode.length - 5);
            }
              this.reqCatId = (parseInt(requesitionOurCode) + 1).toString();
              this.reqCatId = this.reqPad.substring(0, this.reqPad.length - this.reqCatId.length) + this.reqCatId;
              
              this.newReqCatId = (this.prefixSetup.rcrnOurCodePrefix + this.reqCatId).toString();
              console.log(this.newReqCatId);
            this.noteSlip.requisitionCategoryOurCode = this.newReqCatId;

          }, error => console.log(error));
      },error => console.log(error));
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
