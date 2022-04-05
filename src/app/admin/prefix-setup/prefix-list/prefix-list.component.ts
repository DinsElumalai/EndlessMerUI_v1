import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { PrefixSetup } from '../prefix-setup';
import { ApiUrls } from 'src/app/api.urls';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-prefix-list',
  templateUrl: './prefix-list.component.html',
  styleUrls: ['./prefix-list.component.scss']
})
export class PrefixListComponent implements OnInit {

  prefixs: Observable<PrefixSetup[]>;
  isDeleteAllowed : boolean = false;
  

  constructor(private adminService: AdminService,private authService : AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.authService.sessionVerification();
    if( this.adminService.getUserRoles().includes('rl_prefix_create'))
        this.isDeleteAllowed = true;
    this.reloadData();
  }

  reloadData() {
    this.prefixs = this.adminService.getList(ApiUrls.prefixApi);
    this.prefixs = this.prefixs.pipe(map((data) => {
      data.sort((a, b) => {
          return a.id > b.id ? -1 : 1;
       });
      return data;
      }))
  }

  deletePrefix(id: number) {
    this.adminService.delete(ApiUrls.prefixApi, id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
