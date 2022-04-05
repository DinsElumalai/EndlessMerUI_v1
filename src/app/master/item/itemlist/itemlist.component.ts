import { map } from 'rxjs/operators';
import { Item } from './../item';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ApiUrls } from 'src/app/api.urls';
import { AuthenticationService } from 'src/app/services/auth.service';

import { FormControl } from '@angular/forms';
import { MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
//import {  MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {

  items : Item[];
  isDelete = false;

  
 

  

   //paginator: MatPaginator;

  constructor(private adminService: AdminService, private authService : AuthenticationService) { 

    this.reloadData();
    

  }

  ngOnInit(): void {

    this.authService.sessionVerification();
    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_item_delete'))
      this.isDelete=true;

      
      
  }

  

  reloadData() {
     this.adminService.getList(ApiUrls.itemApi).subscribe(
       data => {
            this.items = data;
      });
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.itemApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
