import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrls } from 'src/app/api.urls';
import { Employee} from 'src/app/master/employee/employee';
import { Item } from 'src/app/master/item/item';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { NoteSlip } from '../../noteslip';

@Component({
  selector: 'app-list-rpan',
  templateUrl: './list-rpan.component.html',
  styleUrls: ['./list-rpan.component.scss']
})
export class ListRpanComponent implements OnInit {

  noteSlips : NoteSlip[];
  isDelete = false;
  isVerify = false;
  isUnverify = false;

  filterOperatorEmployeeId : string ="";
  filterPartItemId : string ="";
  filterFromDate : Date;
  filtertoDate : Date;
  copyOfNoteSlips : NoteSlip[];
  employees : Employee[];
  partItems : Item[];

  page = 1;
  pageSize = 20;
  collectionSize: number

  
  constructor(private authService : AuthenticationService,private adminService : AdminService) { }

  ngOnInit(): void {

    this.reloadData();
    this.getItems();
    this.getEmployees();
  }

  reloadData()
  {
    this.filterFromDate = new Date();
    this.filtertoDate = new Date();
    this.adminService.getList(ApiUrls.transactionByReqCodeApi + "/RPAN").subscribe(
      data =>  {
                  this.noteSlips = data;
                  this.noteSlips = this.noteSlips.sort((a, b) => (a.requisitionCategoryOurCode > b.requisitionCategoryOurCode ? -1 : 1));
                  this.copyOfNoteSlips = this.noteSlips;
              });
     if(this.authService.getUserRoles().includes('rl_rpan_delete'))
          this.isDelete = true;
          
          if(this.authService.getUserRoles().includes('rl_rpan_verify'))
          this.isVerify = true;

        if(this.authService.getUserRoles().includes('rl_rpan_unverify'))
          this.isUnverify = true;
  }
  applyFilter()
  {
    this.noteSlips = this.copyOfNoteSlips;
    
    
    this.noteSlips = this.noteSlips.filter( noteSlip => {

      let date = new Date(noteSlip.noteSlipDate);
      
      //console.log(this.filterUserId);
     if(this.filterFromDate != null && this.filtertoDate != null && 
              this.filterOperatorEmployeeId != null && this.filterPartItemId != null)
        return (date >= new Date(this.filterFromDate) && date <= new Date(this.filtertoDate) && 
              noteSlip.partItemId.toLowerCase().includes(this.filterPartItemId.toLowerCase()) &&
              noteSlip.operatorEmployeeId.toLowerCase().includes(this.filterOperatorEmployeeId.toLowerCase()));
      else if(this.filterFromDate != null && this.filtertoDate != null && this.filterOperatorEmployeeId != null)  
          return (date >= new Date(this.filterFromDate) && date <= new Date(this.filtertoDate) && 
                      noteSlip.operatorEmployeeId.toLowerCase().includes(this.filterOperatorEmployeeId.toLowerCase()));
      else if(this.filterFromDate != null && this.filtertoDate != null && this.filterPartItemId != null)
                return (date >= new Date(this.filterFromDate) && date <= new Date(this.filtertoDate) && 
                noteSlip.partItemId.toLowerCase().includes(this.filterPartItemId.toLowerCase()));
      else if(this.filterPartItemId != null)
                return noteSlip.partItemId.toLowerCase().includes(this.filterPartItemId.toLowerCase());
      else if(this.filterOperatorEmployeeId != null)
                return noteSlip.operatorEmployeeId.toLowerCase().includes(this.filterOperatorEmployeeId.toLowerCase());
      else if(this.filterFromDate != null && this.filtertoDate != null)
                return (date >= new Date(this.filterFromDate) && date <= new Date(this.filtertoDate));
      else
                return noteSlip;
    } );
    //console.log(this.userLogs);
    this.collectionSize = this.noteSlips.length;
  }

  getItems()
  {
    this.adminService.get(ApiUrls.itemApi).subscribe(data => {
      
      this.partItems = data;
      this.partItems = this.partItems.filter(partItem => partItem.itemTypeId == "1");
      
    }, error => console.log(error));
  }

  getEmployees()
  {
    this.adminService.get(ApiUrls.employeeApi).subscribe(data => {
      
      this.employees = data;
    }, error => console.log(error));
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.transactionApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  update(noteSlip : NoteSlip, verifyStatus : string)
  {
    if(verifyStatus == 'verify')
      noteSlip.verified = true;
    if(verifyStatus == 'unverify')
      noteSlip.verified = false;
    this.adminService.update(ApiUrls.transactionApi + "/" + noteSlip.noteSlipId, noteSlip)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
