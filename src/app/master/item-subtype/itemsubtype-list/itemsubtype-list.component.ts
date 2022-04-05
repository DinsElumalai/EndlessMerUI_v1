import { ItemSubtype } from './../item-subtype';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ApiUrls } from 'src/app/api.urls';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-itemsubtype-list',
  templateUrl: './itemsubtype-list.component.html',
  styleUrls: ['./itemsubtype-list.component.scss']
})
export class ItemsubtypeListComponent implements OnInit {

  itemSubtypes : Observable<ItemSubtype[]>;
  isDelete = false;
  
  constructor(private adminService: AdminService, private authService : AuthenticationService) { }

  ngOnInit(): void {

    this.authService.sessionVerification();
    this.reloadData();
    if(this.adminService.getUserRoles().includes('rl_itemsubtype_delete'))
      this.isDelete = true;
  }

  reloadData() {
    this.itemSubtypes = this.adminService.getList(ApiUrls.itemSubTypeApi);
  }

  delete(id: number) {
    this.adminService.delete(ApiUrls.itemSubTypeApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
