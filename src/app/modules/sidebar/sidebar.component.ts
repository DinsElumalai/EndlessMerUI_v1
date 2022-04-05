
import { Component, OnInit } from '@angular/core';
import { sidebarAnimation, iconAnimation, labelAnimation } from 'src/app/animations';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    sidebarAnimation(),
    iconAnimation(),
    labelAnimation(),
  ]
})
export class SidebarComponent implements OnInit {

  sidebarState: string;
  masterState : boolean;
  adminState : boolean;
  transactionState : boolean;

  isMasterAllowed : boolean = false;
  isAdminAllowed : boolean = false;
  isTransactionAllowed : boolean = false;


  userRoles : string;

  constructor(
    private sidebarService: SidebarService,private authService : AuthenticationService
  ) { }

  ngOnInit() {
    
    
    this.setupDisplayBasedOnRole();
    this.sidebarService.sidebarStateObservable$.
      subscribe((newState: string) => {
        this.sidebarState = newState;
      });

      
  }

  setupDisplayBasedOnRole()
  {
    //this.userRoles = this.authService.getUserRoles();
    this.userRoles = sessionStorage.getItem("mmsUserRoles") || '';
    console.log(this.userRoles);

    if(this.userRoles.includes('rl_admin_base'))
      this.isAdminAllowed = true;
    
      if(this.userRoles.includes('rl_master_base'))
       { this.isMasterAllowed = true;
       // console.log(this.isAdminAllowed);
       }

      if(this.userRoles.includes('rl_transaction_base'))
        this.isTransactionAllowed = true;

  }

  

}
