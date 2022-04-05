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
  selector: 'app-add-ppon',
  templateUrl: './add-ppon.component.html',
  styleUrls: ['./add-ppon.component.scss']
})
export class AddPponComponent implements OnInit {

  noteSlip : NoteSlip = new NoteSlip();
  submitted = false;
  isSuccess : boolean = false;
  employees : Employee[];
  machineItems : Item[];
  partItems : Item[];
  materialItems : Item[];
  vendors : Vendor[];
  qryString : string;
  lastRcrnTransaction : NoteSlip;
  pponLastTransaction : NoteSlip;
  pdrnLastTransaction : NoteSlip;
  isMismatchAvailable : boolean = false;
  prefixSetup : PrefixSetup;
  reqCatId : string;
  newReqCatId : string;
  reqPad : string = "00000";
  canInsert : boolean = false;
  isTransactionCategory : boolean = false;
  partItemText : string;
  machineItemText : string;
  isSubmitEnabled : boolean = true;

  
  constructor(private adminService: AdminService, private router: Router,
     private preloadServ : PreloadService, private authService : AuthenticationService) { }

  ngOnInit(): void {

    this.noteSlip.transactionCategory = "Actual";
    this.noteSlip.requisitionCategory = "PPON";
    this.noteSlip.verified = false;
    this.noteSlip.noteSlipDate = new Date().toISOString().slice(0,10);
    this.generateRequesitionCode();
    this.getEmpCode();
    this.getItems();
    this.getVendors();

    if(this.authService.getUserRoles().includes('rl_ppon_transactioncategory'))
          this.isTransactionCategory = true;
    
  }

  save() {

    this.canInsert = true;
    this.noteSlip.createdClient = this.preloadServ.getCreatedClient();
    //this.canInsert = false;
    if(this.noteSlip.partItemId == null || this.noteSlip.productionCategory == null || this.noteSlip.partStage == null ||
      this.noteSlip.partItemId == "" || this.noteSlip.productionCategory == "" || this.noteSlip.partStage == "")
    { 
       this.canInsert = false;
       alert("Part Item ID, Production Category , Part Stage are mandatory...");
    }
    if(this.noteSlip.operatorEmployeeId == null || this.noteSlip.operatorEmployeeId == "")
    {
      alert("Operator is missing....");
      this.canInsert = false;
    }
    if(this.noteSlip.machineItemId == null || this.noteSlip.machineItemId == "")
    {
      alert("Machine Item ID is missing....");
      this.canInsert = false;
    }
    if(this.noteSlip.partItemId == null || this.noteSlip.partItemId == "")
    {
      alert("Part Item ID is missing....");
      this.canInsert = false;
    }
    if(this.noteSlip.rejectedNos > 0 && this.noteSlip.rejectedWt == null)
    {
        this.canInsert = false;
        alert("Rejected Weight is required..");
    }
    else if(this.noteSlip.rejectedNos > 0 && this.noteSlip.rejectedWt <= 0)
    {  
      this.canInsert = false;
      alert("Rejected Weight can't be 0 or below Zero");
    }
    if(this.noteSlip.rejectedNos > 0 && this.noteSlip.rejectedReason == null)
    {
      this.canInsert = false;
      alert("Rejected Reason is Required...");
    }

    if(this.noteSlip.transactionCategory == 'Actual')
    {
      if(!(this.noteSlip.okayNos > 0 || this.noteSlip.rejectedNos > 0))
       { this.canInsert = false;
        alert("Okay Nos is Required..");
      }
    }

    if(!(this.noteSlip.stockNos >= (this.noteSlip.okayNos + this.noteSlip.rejectedNos)))
    {
      this.canInsert = false;
      alert("Okay + Rejection is less the Stock Nos....Revisit the Data..");
    }
    /*if(!(this.noteSlip.stockWt >= (this.noteSlip.okayWt + this.noteSlip.rejectedWt)))
    {
      this.canInsert = false;
      alert("Okay + Rejection is less the Stock Wt....Revisit the Data..");
    }*/

    if(this.noteSlip.directTakenNos > 0)
    {
      if(!(this.noteSlip.directTakenNos >= this.noteSlip.okayNos))
      {
        this.canInsert = false;
        alert("Direct taken Nos is less than Okay Nos...");
      }
    }
    if(this.noteSlip.directTakenWt > 0)
    {
      if(!(this.noteSlip.directTakenWt >= this.noteSlip.okayWt))
      {
        this.canInsert = false;
        alert("Direct taken Nos is less than Okay Wt...");
      }
    }


    if(this.noteSlip.productionCategory == "RP-SFP")
    {
      if(!(this.noteSlip.pendingTakenNos >= (this.noteSlip.okayNos + this.noteSlip.rejectedNos)))
      {
        this.canInsert = false;
        alert("Pending taken Nos is less than Okay Nos + Rejection Nos...");
      }
    }
    if(this.noteSlip.productionCategory == "RP-SFP")
    {
      if(!(this.noteSlip.pendingTakenWt >= (this.noteSlip.okayWt + this.noteSlip.rejectedWt)))
      {
        this.canInsert = false;
        alert("Pending taken Nos is less than Okay Nos + Rejection Wt...");
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

      if(this.canInsert)
      {

        this.isSubmitEnabled = false;
        
              this.noteSlip.createdUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
              this.noteSlip.updatedUserId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
              
              if(this.noteSlip.productionCategory == "RP-SFP")
              {
                this.noteSlip.takenNos = this.noteSlip.okayNos + this.noteSlip.rejectedNos;
                this.noteSlip.takenWt = this.noteSlip.okayWt + this.noteSlip.rejectedWt;
              }
              else if(this.noteSlip.directTakenNos > 0 || this.noteSlip.directTakenWt > 0  )
              {
                this.noteSlip.takenNos = this.noteSlip.okayNos;
                this.noteSlip.takenWt = this.noteSlip.okayWt;
              }
              else
              {
                this.noteSlip.takenNos = 0;
                this.noteSlip.takenWt = 0;
              }
              
              
              this.noteSlip.mismatchNos = this.noteSlip.mismatchNos + this.noteSlip.adjustNos;
              this.noteSlip.mismatchWt = this.noteSlip.mismatchWt + this.noteSlip.adjustWt;
              

              this.updateExistingNoteSlip();
              
              
              this.adminService
              .add(ApiUrls.transactionApi, this.noteSlip).subscribe(data => {
                //console.log(this.lastRcrnTransaction);
                //console.log(this.pdrnLastTransaction);
                  if(this.lastRcrnTransaction != null)  
                  {  
                    this.adminService
                    .update(ApiUrls.transactionApi + '/' + this.lastRcrnTransaction.noteSlipId, this.lastRcrnTransaction).subscribe(result =>
                      {
                        this.lastRcrnTransaction = new NoteSlip();
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
                        this.noteSlip = new NoteSlip();
                        this.isSuccess = true;
                        this.reloadCurrentRoute();
                
              }, 
              error => console.log(error));
      }
  }

  updateExistingNoteSlip()
  {
    if(this.noteSlip.productionCategory == 'Regular')
    {
      this.lastRcrnTransaction.takenNos = this.lastRcrnTransaction.takenNos + this.noteSlip.okayNos + this.noteSlip.rejectedNos;
      this.lastRcrnTransaction.takenWt = this.lastRcrnTransaction.takenWt + this.noteSlip.okayWt + this.noteSlip.rejectedWt;
      //console.log(this.noteSlip.rejectedNos);
      if(this.lastRcrnTransaction.directTakenNos > 0)
        this.lastRcrnTransaction.directTakenNos = this.lastRcrnTransaction.directTakenNos - this.noteSlip.okayNos;
      if(this.lastRcrnTransaction.directTakenWt > 0)
        this.lastRcrnTransaction.directTakenWt = this.lastRcrnTransaction.directTakenWt - this.noteSlip.okayWt;
      
    }
    if(this.noteSlip.productionCategory == 'RP-SFP')
    {
      this.lastRcrnTransaction.takenNos = this.lastRcrnTransaction.takenNos + this.noteSlip.okayNos + this.noteSlip.rejectedNos;
      this.lastRcrnTransaction.takenWt = this.lastRcrnTransaction.takenWt + this.noteSlip.okayWt + this.noteSlip.rejectedWt;
      
      if(this.lastRcrnTransaction.pendingTakenNos > 0)
        this.lastRcrnTransaction.pendingTakenNos = this.lastRcrnTransaction.pendingTakenNos - (this.noteSlip.okayNos + this.noteSlip.rejectedNos);
      
      if(this.lastRcrnTransaction.pendingTakenWt > 0)
        this.lastRcrnTransaction.pendingTakenWt = this.lastRcrnTransaction.pendingTakenWt - (this.noteSlip.okayWt + this.noteSlip.rejectedWt);
    }
    if(this.noteSlip.productionCategory == 'CV(FP)' || this.noteSlip.productionCategory == 'V-SFP' )
    {
      this.pdrnLastTransaction.takenNos = this.pdrnLastTransaction.takenNos + this.noteSlip.okayNos + this.noteSlip.rejectedNos;
      this.pdrnLastTransaction.takenWt = this.pdrnLastTransaction.takenWt + this.noteSlip.okayWt + this.noteSlip.rejectedWt;
      if(this.pdrnLastTransaction.directTakenNos > 0)
      {
        this.pdrnLastTransaction.directTakenNos = this.pdrnLastTransaction.directTakenNos - this.noteSlip.okayNos;
      }
      if(this.pdrnLastTransaction.directTakenWt > 0)
      {
        this.pdrnLastTransaction.directTakenWt = this.pdrnLastTransaction.directTakenWt - this.noteSlip.okayWt;
      }
      

    }

  }
  getPdrnLastTransaction()
  {
    this.qryString =  '/' + this.noteSlip.partItemId + '/1/PDRN';
    this.adminService.get(ApiUrls.transPdrnLastByRtApi + this.qryString ).subscribe(data => {

      this.pdrnLastTransaction = data;
      console.log(data);

      if(this.noteSlip.productionCategory == 'V-SFP' || this.noteSlip.productionCategory == 'CV(FP)')
        {
          console.log("PPON - Inside VSFP");
          if( this.pdrnLastTransaction != null)
         { console.log("PPON - Inside VSFP - apply logic ");
          this.noteSlip.stockNos = this.pdrnLastTransaction.openingNos + this.pdrnLastTransaction.okayNos - this.pdrnLastTransaction.takenNos + this.pdrnLastTransaction.mismatchNos;
          this.noteSlip.stockWt = this.pdrnLastTransaction.openingWt + this.pdrnLastTransaction.okayWt - this.pdrnLastTransaction.takenWt + this.pdrnLastTransaction.mismatchWt;
          console.log(this.noteSlip.stockNos);
        }
        }

    },
    error => console.log(error));
  }
  getRcrnLastTransaction()
  {
    
    this.getPdrnLastTransaction();
    this.qryString =  '/' + this.noteSlip.partItemId + '/1/RCRN';
    this.adminService.get(ApiUrls.transRcrnLastApi + this.qryString ).subscribe(data => {
      
      console.log(data);
      this.lastRcrnTransaction = data;
      
      if(data != null)
      {
        if(this.noteSlip.productionCategory == 'Regular' && this.lastRcrnTransaction != null)
        {
          this.noteSlip.stockNos = this.lastRcrnTransaction.openingNos + this.lastRcrnTransaction.okayNos - this.lastRcrnTransaction.takenNos + this.lastRcrnTransaction.mismatchNos;
          this.noteSlip.stockWt = this.lastRcrnTransaction.openingWt + this.lastRcrnTransaction.okayWt - this.lastRcrnTransaction.takenWt  + this.lastRcrnTransaction.mismatchWt;
          
        }
        else if(this.noteSlip.productionCategory == 'RP-SFP' && this.lastRcrnTransaction != null)
        {
          this.noteSlip.stockNos = this.lastRcrnTransaction.pendingTakenNos;
          this.noteSlip.stockWt = this.lastRcrnTransaction.pendingTakenWt;
        }
        
        
        this.isMismatchAvailable = true;
      }

    }, error => console.log(error));
  }

  getLastPponTransaction()
  {
    if(this.noteSlip.partStage != null && this.noteSlip.partItemId != null)
    {
            this.getRcrnLastTransaction()
            this.qryString =  '/' + this.noteSlip.partItemId + '/' + this.noteSlip.partStage + '/PPON';
            this.adminService.get(ApiUrls.transPponLastApi + this.qryString ).subscribe(data => {
              
              console.log(data);
              this.pponLastTransaction = data;
              if(data == null)
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
              else
              {
                
                this.noteSlip.openingNos = this.pponLastTransaction.openingNos + this.pponLastTransaction.okayNos - (this.pponLastTransaction.takenNos);
                this.noteSlip.openingWt = this.pponLastTransaction.openingWt + this.pponLastTransaction.okayWt - ( this.pponLastTransaction.takenWt);
                this.noteSlip.mismatchNos = this.pponLastTransaction.mismatchNos;
                this.noteSlip.mismatchWt = this.pponLastTransaction.mismatchWt;
                this.noteSlip.takenNos = this.pponLastTransaction.takenNos;
                this.noteSlip.takenWt = this.pponLastTransaction.takenWt;
                if(this.noteSlip.productionCategory == 'Regular')
                {
                  if(this.pponLastTransaction.directTakenNos > 0)
                      this.noteSlip.directTakenNos = this.pponLastTransaction.directTakenNos - this.noteSlip.okayNos;
                  else
                      this.noteSlip.directTakenNos = this.pponLastTransaction.directTakenNos;

                  if(this.pponLastTransaction.directTakenWt > 0)
                      this.noteSlip.directTakenWt = this.pponLastTransaction.directTakenWt - this.noteSlip.okayWt;
                  else
                      this.noteSlip.directTakenWt = this.pponLastTransaction.directTakenWt;
                  this.noteSlip.pendingTakenNos = 0;
                  this.noteSlip.pendingTakenWt = 0;
                }
                else if(this.noteSlip.productionCategory == 'RP-SFP')
                {
                  this.noteSlip.directTakenNos = 0;
                  this.noteSlip.directTakenWt = 0;
                  if(this.pponLastTransaction.pendingTakenNos > 0)
                      this.noteSlip.pendingTakenNos = this.pponLastTransaction.pendingTakenNos - ( this.noteSlip.okayNos + this.noteSlip.rejectedNos);
                  else
                      this.noteSlip.pendingTakenNos = this.pponLastTransaction.pendingTakenNos;
                  if(this.pponLastTransaction.pendingTakenWt > 0)
                      this.noteSlip.pendingTakenWt = this.pponLastTransaction.pendingTakenWt - ( this.noteSlip.okayWt + this.noteSlip.rejectedWt);
                  else
                      this.noteSlip.pendingTakenWt = this.pponLastTransaction.pendingTakenWt;
                }
                this.isMismatchAvailable = true;
              }

            }, error => console.log(error));
      }
  }

  getEmpCode()
  {
    this.adminService.get(ApiUrls.employeeApi).subscribe(data => {
      
      this.employees = data;
    }, error => console.log(error));
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

      this.adminService.get(ApiUrls.transLastCodeApi + '/PPON').subscribe(data => {

            if(data == null || data.requisitionCategoryOurCode == null)
               requesitionOurCode = "00000";
               else
               {   requesitionOurCode = data.requisitionCategoryOurCode;
                   requesitionOurCode = requesitionOurCode.substring(requesitionOurCode.length - 5);
               }

              this.reqCatId = (parseInt(requesitionOurCode) + 1).toString();
              this.reqCatId = this.reqPad.substring(0, this.reqPad.length - this.reqCatId.length) + this.reqCatId;
              
              this.newReqCatId = (this.prefixSetup.pponOurCodePrefix + this.reqCatId).toString();
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
