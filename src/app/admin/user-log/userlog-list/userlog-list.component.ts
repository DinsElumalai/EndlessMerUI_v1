import { UserLog } from './../user-log';
import { Component, OnInit } from '@angular/core';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userlog-list',
  templateUrl: './userlog-list.component.html',
  styleUrls: ['./userlog-list.component.scss']
})
export class UserlogListComponent implements OnInit {

  userLogs : UserLog[];
  isDelete = false;
  copyUserLogs : UserLog[];

  filterFromDate : Date;
  filtertoDate : Date;
  filterUserId : string = "";

  page = 1;
  pageSize = 10;
  collectionSize: number;
  

  constructor(private authService : AuthenticationService,private adminService: AdminService) { 

    
  }

  ngOnInit(): void {
    this.authService.sessionVerification();
    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_userlog_delete'))
      this.isDelete = true;
  }

  reloadData() {
    this.adminService.getList(ApiUrls.userLogApi).subscribe(data => {

      this.userLogs = data;
      this.copyUserLogs = data;
      this.userLogs.sort((a : UserLog,b : UserLog) => b.logId - a.logId);
      this.collectionSize = this.userLogs.length;
     
    });
    
  }
  
  applyFilter()
  {
    this.userLogs = this.copyUserLogs;
    
    this.userLogs = this.userLogs.filter( userLog => {

      let date = new Date(userLog.logDate,);
      console.log(this.filterUserId);
     if(this.filterUserId != "" && this.filterFromDate != null && this.filtertoDate != null)
     {   
       return (date > new Date(this.filterFromDate) && date < new Date(this.filtertoDate) && userLog.userId.toLowerCase().includes(this.filterUserId.toLowerCase()));
      
    }else if(this.filterFromDate != null && this.filtertoDate != null)
      {  
        return (date > new Date(this.filterFromDate) && date < new Date(this.filtertoDate));
        
      }else if(this.filterUserId != "")
        return userLog.userId.toLowerCase().includes(this.filterUserId.toLowerCase());
      else
        return userLog;
    } );
    //console.log(this.userLogs);
    this.collectionSize = this.userLogs.length;
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.userLogApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
