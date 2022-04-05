
import { PreloadService } from './../../../services/preload.service';
import { PrefixSetup } from 'src/app/admin/prefix-setup/prefix-setup';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/api.urls';
import { Employee } from 'src/app/master/employee/employee';
import { Item } from 'src/app/master/item/item';
import { Vendor } from 'src/app/master/vendor/vendor';
import { AdminService } from 'src/app/services/admin.service';
import { NoteSlip } from '../../noteslip';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-pdrn',
  templateUrl: './add-pdrn.component.html',
  styleUrls: ['./add-pdrn.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPdrnComponent implements OnInit {

  
  noteSlip : NoteSlip = new NoteSlip();
  submitted = false;
  isSuccess : boolean = false;
  employees : Employee[];
  prefixSetup : PrefixSetup;
  reqCatId : string;
  newReqCatId : string;
  reqPad : string = "00000";
  returnPartItems : Item[];
  partItems : Item[];
  issueToVendors : Vendor[];
  materialItems : Item[];
  vendors : Vendor[];
  rpanLastTransaction : NoteSlip;
  pdrnLastTransaction : NoteSlip;
  canInsert : boolean = true;
  isTransactionCategory : boolean = false;
  isSubmitEnabled : boolean = true;
  
  partItemText : string;
  issueToVendorText : string;
  returnPartItemText : string;

  constructor(private adminService: AdminService, private router: Router,
     private preloadServ : PreloadService, private authService : AuthenticationService) 
  { }

  ngOnInit(): void {

    this.noteSlip.transactionCategory = "Actual";
    this.noteSlip.requisitionCategory = "PDRN";
    this.noteSlip.verified = false;
    this.noteSlip.noteSlipDate = new Date().toISOString().slice(0,10);
    this.getEmpCode();
    this.getItems();
    this.getVendors();
    this.generateRequesitionCode();

    if(this.authService.getUserRoles().includes('rl_pdrn_transactioncategory'))
          this.isTransactionCategory = true;
     
  }

  
  save() {

    
    this.noteSlip.createdClient = this.preloadServ.getCreatedClient();
    this.canInsert = true;
    if(this.noteSlip.operatorEmployeeId == null || this.noteSlip.operatorEmployeeId == "")
    {
      alert("Operator is missing....");
      this.canInsert = false;
    }
    if(this.noteSlip.partItemId == null || this.noteSlip.partItemId == "")
    {
      this.canInsert = false;
      alert("Part Item Id is missing....");
    }
    if(this.noteSlip.issueToVendorId == null || this.noteSlip.issueToVendorId == "")
    {
      this.canInsert = false;
      alert("Issue To Vendor Id is missing....");
    }
    if(this.noteSlip.partItemId == null || this.noteSlip.issueCategory == null || this.noteSlip.partStage == null || this.noteSlip.issueToVendorId == null
      && this.noteSlip.requisitionGroupCategory == null || this.noteSlip.requisitionGroupNo == null)
    { 
       this.canInsert = false;
       alert("Part Item ID, Issue Category , Part Stage, Issue To Vendor, Request Group category , Request group number are mandatory...");
    }   

    if(this.noteSlip.issueToVendorId == "1" )
    {
      if(this.noteSlip.returnPartItemId == null || this.noteSlip.returnPartItemId == "")
      {
        this.canInsert = false;
      alert("Return Part Item ID is required...");
      }
    }
    else if(this.noteSlip.issueCategory == 'Conversion')
    {
      if(this.noteSlip.returnPartItemId == null || this.noteSlip.returnPartItemId == "")
      {
        this.canInsert = false;
      alert("Return Part Item ID is required...");
      }
    }

    if(this.noteSlip.transactionCategory == 'Actual' && this.noteSlip.partStage == 'FP')
    {
      if(this.noteSlip.okayNos <= 0)
       { this.canInsert = false;
        alert("Okay Nos is Required..");
      }
    }
    if(this.noteSlip.transactionCategory == 'Actual' && this.noteSlip.partStage == 'SFP')
    {
      if(this.noteSlip.okayNos > 0 && this.noteSlip.okayWt <= 0)
      { this.canInsert = false;
        alert("Okay Wt is Required..");
      }
       
    }

    if(!(this.noteSlip.stockNos >= (this.noteSlip.okayNos + this.noteSlip.rejectedNos)))
    {
      this.canInsert = false;
      alert("Okay + Rejection is less the Stock Nos....Revisit the Data..");
    }
    if(!(this.noteSlip.stockWt >= (this.noteSlip.okayWt + this.noteSlip.rejectedWt)))
    {
      this.canInsert = false;
      alert("Okay + Rejection is less the Stock Wt....Revisit the Data..");
    }

    if(this.noteSlip.issueToVendorId == "1" && this.noteSlip.issueCategory == "Regular")
    {
      this.noteSlip.returnPartItemId = this.noteSlip.partItemId;
    }

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

    
    if(this.canInsert)
    {
        this.isSubmitEnabled = false;
          this.noteSlip.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
          this.noteSlip.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
          
          this.noteSlip.takenNos = 0;
          this.noteSlip.takenWt = 0;
          
          this.adminService
          .add(ApiUrls.transactionApi, this.noteSlip).subscribe(
          data => {

              if(this.rpanLastTransaction != null)
              {
                this.rpanLastTransaction.takenNos = this.rpanLastTransaction.takenNos + (this.noteSlip.okayNos + this.noteSlip.rejectedNos);
                this.rpanLastTransaction.takenWt = this.rpanLastTransaction.takenWt + (this.noteSlip.okayWt + this.noteSlip.rejectedWt);
              
                this.adminService
                .update(ApiUrls.transactionApi + "/" + this.rpanLastTransaction.noteSlipId, this.rpanLastTransaction).subscribe(
                  result => {

                                      //console.log(data)
                              this.noteSlip = new NoteSlip();
                              this.rpanLastTransaction = new NoteSlip();
                              this.isSuccess = true;
                              this.reloadCurrentRoute();

                            },
                  error => console.log(error)
                  
                  );
                }
                else
                {
                              this.noteSlip = new NoteSlip();
                              this.rpanLastTransaction = new NoteSlip();
                              this.isSuccess = true;
                              this.reloadCurrentRoute();
                }
          }, 
          error => console.log(error));
      }
  }

  
  getLastRpanTransaction()
  {
    let qrystr = "/" + this.noteSlip.partItemId + "/" + this.noteSlip.partStage + "/RPAN";
    this.adminService.get(ApiUrls.transRpanLastApi + qrystr).subscribe(data => {
      
      this.rpanLastTransaction = data;
      this.autoFillByLastRpan()

    }, error => console.log(error));

  }
  getLastPdrnTransaction()
  {
    this.selectIssueCategory();
    if(this.noteSlip.partStage != null && this.noteSlip.partItemId != null && this.noteSlip.issueToVendorId != null)
    {
      let qrystr = "/" + this.noteSlip.partItemId + "/" + this.noteSlip.partStage + "/" + this.noteSlip.issueToVendorId + "/PDRN";
      this.adminService.get(ApiUrls.transPdrnLastApi + qrystr).subscribe(data => {
        
        this.pdrnLastTransaction = data;
        this.autoFillByLastPdrn()

      }, error => console.log(error));
    }
  }

  getVendors()
  {
    this.adminService.get(ApiUrls.vendorApi).subscribe(data => {
      
      this.vendors = data;
    }, error => console.log(error));
  }

  selectIssueCategory()
  {
    if(this.noteSlip.issueToVendorId != null || this.noteSlip.issueToVendorId != "")
    {
      if(this.noteSlip.issueToVendorId == "1")
      {
        this.noteSlip.issueCategory = "Conversion";
      }
      else
        this.noteSlip.issueCategory = "Regular";
    }
  }

  autoFillByLastPdrn()
  {
    if(this.pdrnLastTransaction != null)
    {
      this.noteSlip.openingNos = this.pdrnLastTransaction.openingNos + this.pdrnLastTransaction.okayNos - ( this.pdrnLastTransaction.takenNos);
      this.noteSlip.openingWt = this.pdrnLastTransaction.openingWt + this.pdrnLastTransaction.okayWt - ( this.pdrnLastTransaction.takenWt);
      this.noteSlip.mismatchNos = this.pdrnLastTransaction.mismatchNos + this.pdrnLastTransaction.adjustNos;
      this.noteSlip.mismatchWt = this.pdrnLastTransaction.mismatchWt + this.pdrnLastTransaction.adjustWt;
      this.noteSlip.takenNos = this.pdrnLastTransaction.takenNos;
      this.noteSlip.takenWt = this.pdrnLastTransaction.takenWt;
      this.noteSlip.directTakenNos = this.pdrnLastTransaction.directTakenNos;
      this.noteSlip.directTakenWt = this.pdrnLastTransaction.directTakenWt;
      this.noteSlip.pendingTakenNos = this.pdrnLastTransaction.pendingTakenNos;
      this.noteSlip.pendingTakenWt = this.pdrnLastTransaction.pendingTakenWt;
    }
    else
    {
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
    
  }

  autoFillByLastRpan()
  {
    if(this.rpanLastTransaction != null)
    {
      this.noteSlip.stockNos = this.rpanLastTransaction.openingNos + this.rpanLastTransaction.okayNos - this.rpanLastTransaction.takenNos + this.rpanLastTransaction.mismatchNos;
      this.noteSlip.stockWt = this.rpanLastTransaction.openingWt + this.rpanLastTransaction.okayWt - this.rpanLastTransaction.takenWt + this.rpanLastTransaction.mismatchWt;  
    }
    else
    {
      this.noteSlip.stockNos = 0;
      this.noteSlip.stockWt = 0;
    }
    
  }
  getIssueToVendorArr()
  {
    if(this.noteSlip.partItemId != null && this.noteSlip.partStage != null)
    {
           this.getLastPdrnTransaction();
            this.getLastRpanTransaction();

          if(this.noteSlip.partStage == 'SFP')
            this.issueToVendors = this.vendors.filter(vendor => vendor.jobWork == true);
          
          if(this.noteSlip.partStage == 'FP')
            this.issueToVendors = this.vendors.filter(vendor => vendor.sales == true);
    }
  }
  getItems()
  {
    this.adminService.get(ApiUrls.itemApi).subscribe(data => {
      
      
      this.partItems = data;
      this.partItems = this.partItems.filter(partItem => partItem.itemTypeId == "1");
      this.returnPartItems = this.partItems;

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
  displayReturnPart()
  {
    let id = this.noteSlip.returnPartItemId;
    if(this.returnPartItems.filter(item => item.itemId === Number(id)).length > 0)
    {
      let returnPartItem = this.returnPartItems.filter(item => item.itemId === Number(id))[0];
      this.returnPartItemText = returnPartItem.itemNameId + " - " + returnPartItem.itemNumber + " - " + returnPartItem.itemName;
    }
    else
    {
      this.returnPartItemText = "";
      this.noteSlip.returnPartItemId = "";
    }
  }
  
  assignRequistionGroupCategory()
  {
    if(this.noteSlip.partStage == "FP")
        this.noteSlip.requisitionGroupCategory = "Invoice";
    else
        this.noteSlip.requisitionGroupCategory = "DC";
  }

  getEmpCode()
  {
    this.adminService.get(ApiUrls.employeeApi).subscribe(data => {

      this.employees = data;
    }, error => console.log(error));
  }

  generateRequesitionCode()
  {
    let requesitionOurCode;
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        
      this.prefixSetup = data;

      this.adminService.get(ApiUrls.transLastCodeApi + '/PDRN').subscribe(data => {

              if(data == null || data.requisitionCategoryOurCode == null)
                  requesitionOurCode = "00000";
               else
               {   requesitionOurCode = data.requisitionCategoryOurCode;
                   requesitionOurCode = requesitionOurCode.substring(requesitionOurCode.length - 5);
               }

              this.reqCatId = (parseInt(requesitionOurCode) + 1).toString();
              this.reqCatId = this.reqPad.substring(0, this.reqPad.length - this.reqCatId.length) + this.reqCatId;
              
              this.newReqCatId = (this.prefixSetup.pdrnOurCodePrefix + this.reqCatId).toString();
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
