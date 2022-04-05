import { AuthenticationService } from './../../../services/auth.service';
import { PreloadService } from './../../../services/preload.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrefixSetup } from 'src/app/admin/prefix-setup/prefix-setup';
import { ApiUrls } from 'src/app/api.urls';
import { Employee } from 'src/app/master/employee/employee';
import { Item } from 'src/app/master/item/item';
import { Vendor } from 'src/app/master/vendor/vendor';
import { AdminService } from 'src/app/services/admin.service';
import { NoteSlip } from '../../noteslip';

@Component({
  selector: 'app-add-rpan',
  templateUrl: './add-rpan.component.html',
  styleUrls: ['./add-rpan.component.scss']
})
export class AddRpanComponent implements OnInit {

  
  noteSlip : NoteSlip = new NoteSlip();
  submitted = false;
  isSuccess : boolean = false;
  employees : Employee[];
  machineItems : Item[];
  partItems : Item[];
  returnPartItems : Item[];
  vendors : Vendor[];
  receiptFromVendors : Vendor[];
  issueToVendors : Vendor[];
  qryString : string;
  rcrnLastTransaction : NoteSlip;
  pponLastTransaction : NoteSlip;
  pdrnLastTransaction : NoteSlip;
  rpanLastTransaction : NoteSlip;
  isMismatchAvailable : boolean = false;
  prefixSetup : PrefixSetup;
  reqCatId : string;
  newReqCatId : string;
  reqPad : string = "00000";
  canInsert : boolean = false;
  isTransactionCategory : boolean = false;
  isSubmitEnabled : boolean = true;

  partItemText : string;
  issueToVendorText : string;
  returnPartItemText : string;
  receiptFromVendorText : string;
  

  constructor(private adminService: AdminService, private router: Router,
     private preloadServ : PreloadService, private authService : AuthenticationService) { }

  ngOnInit(): void {

    this.noteSlip.transactionCategory = "Actual";
    this.noteSlip.requisitionCategory = "RPAN";
    this.noteSlip.issueCategory = "Regular";
    this.noteSlip.verified = false;
    this.noteSlip.noteSlipDate = new Date().toISOString().slice(0,10);
    this.noteSlip.fromShopfloor = false;
    this.noteSlip.toStock = true;
    //this.noteSlip.noteSlipDate 
    //this.noteSlip.toStock = false;
    this.getEmpCode();
    this.getItems();
    this.getVendors();
    this.generateRequesitionCode();

    if(this.authService.getUserRoles().includes('rl_rpan_transactioncategory'))
          this.isTransactionCategory = true;
    
  }

  validateBeforeSave()
  {

    this.noteSlip.createdClient = this.preloadServ.getCreatedClient();
    this.canInsert = true;
    

    if(this.noteSlip.toStock == true)
    {
      if(this.noteSlip.issueToVendorId == null || this.noteSlip.issueToVendorId == "")
        {
          this.canInsert = false;
          alert("Issue to vendor ID is Required..");
        }
    }
    if(this.noteSlip.operatorEmployeeId == null || this.noteSlip.operatorEmployeeId == "")
    {
      alert("Operator is missing....");
      this.canInsert = false;
    }
    
    if(this.noteSlip.partItemId == null || this.noteSlip.partItemId == "")
    {
      alert("Part Item ID is missing....");
      this.canInsert = false;
    }
    if(this.noteSlip.receiptFromVendorId == null || this.noteSlip.receiptFromVendorId == "")
    {
      alert("Receipt From Vendor Id is missing....");
      this.canInsert = false;
    }
    if(this.noteSlip.partItemId == null || this.noteSlip.productionCategory == null || this.noteSlip.partStage == null || this.noteSlip.receiptFromVendorId == null ||
    this.noteSlip.partItemId == "" || this.noteSlip.productionCategory == "" || this.noteSlip.partStage == "" || this.noteSlip.receiptFromVendorId == "")
    { 
       this.canInsert = false;
      
       alert("Part Item ID, Production Category , Part Stage, Receipt from vendor are mandatory...");
    }
       if(this.noteSlip.issueToVendorId == "1" && this.noteSlip.toStock == false )
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
      
    if(this.noteSlip.toStock == false)
    {
      if(this.noteSlip.requisitionGroupCategory == null || this.noteSlip.requisitionGroupNo == null ||
         this.noteSlip.issueCategory == null || this.noteSlip.issueToVendorId == null)
      {
        this.canInsert = false;
        alert("Requestion Group Category, Requisition Group No , Issue Category and Issue to Vendor are Required...");
      }
    }

    if(this.noteSlip.transactionCategory == "Actual")
    {
      if(this.noteSlip.receiptFromVendorId == "1")
      {
        if(this.noteSlip.okayNos <= 0)
        {
          this.canInsert = false;
        alert("Okay Nos is Required..");
        }
      }
      else
      {
        if(this.noteSlip.okayNos <= 0 || this.noteSlip.okayWt <= 0)
        {
          this.canInsert = false;
          alert("Okay Nos , Okay Wt is Required..");
        }
      }

      if(this.noteSlip.partStage == 'SFP' && this.noteSlip.okayWt <= 0)
      {
        this.canInsert = false;
          alert("Okay Wt is Required..");
      }
      
    }
    if(this.noteSlip.fromShopfloor == true && (this.noteSlip.rpSfp == null))
    {
      this.canInsert = false;
      alert("RP-SFP is Required..");
    }

    if(this.noteSlip.fromShopfloor == false && this.noteSlip.transactionCategory == 'Actual')
    {
      if(this.noteSlip.partStage == "FP")
      {
        if(this.noteSlip.okayNos <= 0 )
        { this.canInsert = false;
          alert("Okay Nos is Required..");
        }
      }else{

        if(this.noteSlip.okayNos > 0 && this.noteSlip.okayWt <= 0)
        { this.canInsert = false;
          alert("Okay Nos and Okay Wt is Required..");
        }
      }
       if(this.noteSlip.stockNos < (this.noteSlip.okayNos+ this.noteSlip.rejectedNos))
          {
            console.log(this.noteSlip.okayNos);
            console.log(this.noteSlip.rejectedNos);
            console.log(this.noteSlip.okayNos + this.noteSlip.rejectedNos);
            this.canInsert = false;
            alert("Stock Nos should be greater than Okay + Rejected....Revisit the Data..");
          }
          if(this.noteSlip.receiptFromVendorId != "1")
          {
            if(this.noteSlip.stockWt < (this.noteSlip.okayWt + this.noteSlip.rejectedWt))
            {
              this.canInsert = false;
              alert("Okay + Rejection is greater the Stock Wt....Revisit the Data..");
            }
          }
          
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

  }

  save()
  {
    this.validateBeforeSave();
    
    if(this.canInsert)
    {

      this.isSubmitEnabled = false;

            this.noteSlip.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
            this.noteSlip.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
            
            this.noteSlip.takenNos = 0;
            this.noteSlip.takenWt = 0;

            this.adminService
            .add(ApiUrls.transactionApi, this.noteSlip).subscribe(data => {

              this.updateExistingNoteSlip()

              console.log(this.pponLastTransaction);
              console.log(this.pdrnLastTransaction);

              if(this.pponLastTransaction != null)
              { this.adminService
                .update(ApiUrls.transactionApi + '/' + this.pponLastTransaction.noteSlipId, this.pponLastTransaction).subscribe(result =>
                  {
                    this.pponLastTransaction = new NoteSlip();
                  },
                  error => console.log(error));
                }
              if(this.pdrnLastTransaction != null)
              { 
                this.adminService
              .update(ApiUrls.transactionApi + '/' + this.pdrnLastTransaction.noteSlipId, this.pdrnLastTransaction).subscribe(pdrnResult =>
                {
                      this.pdrnLastTransaction = new NoteSlip();
                },error => console.log(error));
              }
              if(this.rcrnLastTransaction != null)
              { 
                this.adminService
              .update(ApiUrls.transactionApi + '/' + this.rcrnLastTransaction.noteSlipId, this.rcrnLastTransaction).subscribe(rcrnResult =>
                {
                      this.rcrnLastTransaction = new NoteSlip();
                },error => console.log(error));
              }
                    this.noteSlip = new NoteSlip();
                    this.isSuccess = true;
                    this.reloadCurrentRoute();
            },error => console.log(error));
      }

  }

  checkFieldforNull(field : any)
  {
    if(field == null || field == "")
      return 0;
    else
      return field;
  } 

  updateExistingNoteSlip()
  {
    

    if(this.noteSlip.receiptFromVendorId == '1')
    {
      if(this.noteSlip.fromShopfloor == false)
      {
        //console.log("PPON Taken nos : " +this.pponLastTransaction.takenNos);
        this.pponLastTransaction.takenNos = this.checkFieldforNull(this.pponLastTransaction.takenNos) + this.noteSlip.okayNos;
        this.pponLastTransaction.takenWt = this.checkFieldforNull(this.pponLastTransaction.takenWt) + this.noteSlip.okayWt;
          
      }
      
      if(this.noteSlip.fromShopfloor == true && this.noteSlip.rpSfp == false)
      {
        //console.log("PPON Taken nos : " +this.pponLastTransaction.takenNos);
        this.pponLastTransaction.directTakenNos = this.checkFieldforNull(this.pponLastTransaction.directTakenNos) + this.noteSlip.okayNos;
        this.pponLastTransaction.directTakenWt = this.checkFieldforNull(this.pponLastTransaction.directTakenWt) + this.noteSlip.okayWt;

        if(this.noteSlip.productionCategory == 'Regular')
        {
          //console.log("Direct taken nos : "+this.rcrnLastTransaction.directTakenNos);
          this.rcrnLastTransaction.directTakenNos = this.checkFieldforNull(this.rcrnLastTransaction.directTakenNos) + this.noteSlip.okayNos;
          this.rcrnLastTransaction.directTakenWt = this.checkFieldforNull(this.rcrnLastTransaction.directTakenWt) + this.noteSlip.okayWt;
        }
        else
        {
          this.pdrnLastTransaction.directTakenNos = this.checkFieldforNull(this.pdrnLastTransaction.directTakenNos) + this.noteSlip.okayNos;
          this.pdrnLastTransaction.directTakenWt = this.checkFieldforNull(this.pdrnLastTransaction.directTakenWt) + this.noteSlip.okayWt;
        }
      }
      if(this.noteSlip.fromShopfloor == true && this.noteSlip.rpSfp == true)
      {
        console.log("PPON Taken nos : " +this.pponLastTransaction.takenNos);
        this.pponLastTransaction.pendingTakenNos = this.checkFieldforNull(this.pponLastTransaction.pendingTakenNos) + this.noteSlip.okayNos;
        this.pponLastTransaction.pendingTakenWt = this.checkFieldforNull(this.pponLastTransaction.pendingTakenWt) + this.noteSlip.okayWt;
        
        if(this.noteSlip.productionCategory == 'Regular')
        {
            this.rcrnLastTransaction.pendingTakenNos = this.checkFieldforNull(this.rcrnLastTransaction.pendingTakenNos) + this.noteSlip.okayNos;
            this.rcrnLastTransaction.pendingTakenWt = this.checkFieldforNull(this.rcrnLastTransaction.pendingTakenWt) + this.noteSlip.okayWt;
        }
        else
        {
            this.pdrnLastTransaction.pendingTakenNos = this.checkFieldforNull(this.pdrnLastTransaction.pendingTakenNos) + this.noteSlip.okayNos;
            this.pdrnLastTransaction.pendingTakenWt = this.checkFieldforNull(this.pdrnLastTransaction.pendingTakenWt) + this.noteSlip.okayWt;
        }
      }

    }
    else
    {
      this.pdrnLastTransaction.takenNos = this.checkFieldforNull(this.pdrnLastTransaction.takenNos) + this.noteSlip.okayNos;
      this.pdrnLastTransaction.takenWt = this.checkFieldforNull(this.pdrnLastTransaction.takenWt) + this.noteSlip.okayWt;
    }
  }

  getVendors()
  {
    this.adminService.get(ApiUrls.vendorApi).subscribe(data => {
      
      this.vendors = data;
      this.receiptFromVendors = this.vendors.filter(vendor => vendor.jobWork == true);
    }, error => console.log(error));
  }

  getLastPponTransaction()
  {
    let qrystr = "/" + this.noteSlip.partItemId + "/" + this.noteSlip.partStage + "/PPON";
    this.adminService.get(ApiUrls.transPponLastApi + qrystr).subscribe(data => {
      
      this.pponLastTransaction = data;
      console.log(this.pponLastTransaction);
      this.getLastPdrnTransaction();

    }, error => console.log(error));

  }
  getLastRcrnTransaction()
  {
    let qrystr = "/" + this.noteSlip.partItemId + "/1/RCRN";
    this.adminService.get(ApiUrls.transRcrnLastApi + qrystr).subscribe(data => {
      
      this.rcrnLastTransaction = data;
      console.log(this.rcrnLastTransaction);

    }, error => console.log(error));

  }
  getLastPdrnTransaction()
  {
    this.getLastRcrnTransaction();
    let qrystr = "/" + this.noteSlip.partItemId + "/" + this.noteSlip.receiptFromVendorId + "/PDRN";
    this.adminService.get(ApiUrls.transLastPdrnbyRcptfromApi + qrystr).subscribe(data => {
     
      this.pdrnLastTransaction = data;
      

    }, error => console.log(error),
    () => this.calculateStock()
    );

  }
  selectIssueCategory()
  {
    
      if(this.noteSlip.issueToVendorId != null || this.noteSlip.issueToVendorId != "")
      {
        if(this.noteSlip.issueToVendorId == "1" && this.noteSlip.toStock == false)
        {
          this.noteSlip.issueCategory = "Conversion";
        }
        else
          this.noteSlip.issueCategory = "Regular";
      }
    
  }

  getLastRpanTransaction()
  {
    this.getLastPdrnTransaction()
    this.getLastPponTransaction()
    let qrystr = "/" + this.noteSlip.partItemId + "/" + this.noteSlip.partStage + "/RPAN";
    this.adminService.get(ApiUrls.transRpanLastApi + qrystr).subscribe(data => {
      
      this.rpanLastTransaction = data;
      this.autoFillByLastRpan()

    }, error => console.log(error));

  }
  autoFillByLastRpan()
  {

    if(this.rpanLastTransaction != null)
    {
      this.noteSlip.openingNos = this.rpanLastTransaction.openingNos + this.rpanLastTransaction.okayNos - ( this.rpanLastTransaction.takenNos);
      this.noteSlip.openingWt = this.rpanLastTransaction.openingWt + this.rpanLastTransaction.okayWt - ( this.rpanLastTransaction.takenWt);
      this.noteSlip.mismatchNos = this.rpanLastTransaction.mismatchNos + this.rpanLastTransaction.adjustNos;
      this.noteSlip.mismatchWt = this.rpanLastTransaction.mismatchWt + this.rpanLastTransaction.adjustWt;
      this.noteSlip.takenNos = this.rpanLastTransaction.takenNos;
      this.noteSlip.takenWt = this.rpanLastTransaction.takenWt;
      this.noteSlip.directTakenWt = this.rpanLastTransaction.directTakenWt;
      this.noteSlip.directTakenNos = this.rpanLastTransaction.directTakenNos;
      this.noteSlip.pendingTakenNos = this.rpanLastTransaction.pendingTakenNos;
      this.noteSlip.pendingTakenWt = this.rpanLastTransaction.pendingTakenWt;
    }
    else
    {
      this.noteSlip.openingNos = 0;
      this.noteSlip.openingWt = 0;
      this.noteSlip.mismatchNos = 0;
      this.noteSlip.mismatchWt = 0;
      this.noteSlip.takenNos = 0;
      this.noteSlip.takenWt = 0;
      this.noteSlip.directTakenWt = 0;
      this.noteSlip.directTakenNos = 0;
      this.noteSlip.pendingTakenNos = 0;
      this.noteSlip.pendingTakenWt = 0;
    }
  }
  calculateStock()
  {
    if(this.noteSlip.receiptFromVendorId == '1')
    {
      if(this.pponLastTransaction != null)
      {
        this.noteSlip.stockNos = this.pponLastTransaction.openingNos + this.pponLastTransaction.okayNos - this.pponLastTransaction.takenNos + this.pponLastTransaction.mismatchNos;
       this.noteSlip.stockWt = this.pponLastTransaction.openingWt + this.pponLastTransaction.okayWt - this.pponLastTransaction.takenWt + this.pponLastTransaction.mismatchWt;
      }
      else
      {
        this.noteSlip.stockNos = 0;
        this.noteSlip.stockWt = 0;
      }
      
    }
    else
    {
      if(this.pdrnLastTransaction != null)
       {
         this.noteSlip.stockNos = this.pdrnLastTransaction.openingNos + this.pdrnLastTransaction.okayNos - this.pdrnLastTransaction.takenNos + this.pdrnLastTransaction.mismatchNos;
         this.noteSlip.stockWt = this.pdrnLastTransaction.openingWt + this.pdrnLastTransaction.okayWt - this.pdrnLastTransaction.takenWt + this.pdrnLastTransaction.mismatchWt;
       }
       else
       {
         this.noteSlip.stockNos = 0;
         this.noteSlip.stockWt =0;
       }
    }
  }
  getIssueToVendorArr()
  {
    if(this.noteSlip.partItemId != null && this.noteSlip.partStage != null && this.noteSlip.receiptFromVendorId != null)
    {
      
          this.getLastRpanTransaction();

        if(this.noteSlip.partStage == 'SFP')
          this.issueToVendors = this.vendors.filter(vendor => vendor.jobWork == true);
        
        if(this.noteSlip.partStage == 'FP')
          this.issueToVendors = this.vendors.filter(vendor => vendor.sales == true);
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
  assignRequistionGroupCategory()
  {
    if(this.noteSlip.partStage == "FP")
        this.noteSlip.requisitionGroupCategory = "Invoice";
    else
        this.noteSlip.requisitionGroupCategory = "DC";
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
    console.log("part item display");
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
  displayReceiptFromVendor()
  {
    let id = this.noteSlip.receiptFromVendorId;
    if(this.vendors.filter(vendor => vendor.vendorId === Number(id)).length > 0)
    {
      let ipVendor = this.vendors.filter(vendor => vendor.vendorId === Number(id))[0];
      this.receiptFromVendorText = ipVendor.vendorNameId + " - " + ipVendor.vendorName ;
    }
    else
    {
      this.receiptFromVendorText = "";
      this.noteSlip.receiptFromVendorId = "";
    }
  }

  getEmpCode()
  {
    this.adminService.get(ApiUrls.employeeApi).subscribe(data => {

      this.employees = data;
    }, error => console.log(error));
  }

  verifyShopFloorData()
  {
    if(this.noteSlip.stockNos <= 0 && this.noteSlip.receiptFromVendorId == '1')
      return true;
    else
      return false;
  }
  generateRequesitionCode()
  {
    let requesitionOurCode;
    this.adminService.get(ApiUrls.prefixLastApi).subscribe(data => {
        
      this.prefixSetup = data;

      this.adminService.get(ApiUrls.transLastCodeApi + '/RPAN').subscribe(data => {

            if(data == null || data.requisitionCategoryOurCode == null)
               requesitionOurCode = "00000";
               else
               {   requesitionOurCode = data.requisitionCategoryOurCode;
                   requesitionOurCode = requesitionOurCode.substring(requesitionOurCode.length - 5);
               }

              this.reqCatId = (parseInt(requesitionOurCode) + 1).toString();
              this.reqCatId = this.reqPad.substring(0, this.reqPad.length - this.reqCatId.length) + this.reqCatId;
              
              this.newReqCatId = (this.prefixSetup.rpanOurCodePrefix + this.reqCatId).toString();
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
