import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { ItemType } from '../item-type';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-itemtype-list',
  templateUrl: './itemtype-list.component.html',
  styleUrls: ['./itemtype-list.component.scss']
})
export class ItemtypeListComponent implements OnInit {

  itemTypes : Observable<ItemType[]>;
  isDelete = false;
  
  constructor(private authService : AuthenticationService,private adminService: AdminService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    this.reloadData();
  }

  reloadData() {
    this.itemTypes = this.adminService.getList(ApiUrls.itemTypeApi);
    if(this.adminService.getUserRoles().includes('rl_itemtype_delete'))
      this.isDelete = true;
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.itemTypeApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }


}
