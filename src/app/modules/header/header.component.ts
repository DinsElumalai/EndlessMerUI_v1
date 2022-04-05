import { Component, OnInit } from '@angular/core';
import { sidebarAnimation, iconAnimation, labelAnimation } from 'src/app/animations';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    sidebarAnimation(),
    iconAnimation(),
    labelAnimation(),
  ]
})
export class HeaderComponent implements OnInit {

  sidebarState: string;
  static loggedUser : string = 'Guest';
  isLogged : boolean = true;

  constructor(private  sidebarService : SidebarService ) { 

  }

  ngOnInit() {

    HeaderComponent.loggedUser = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
    this.sidebarService.sidebarStateObservable$.
      subscribe((newState: string) => {
        this.sidebarState = newState;
      });
  }

  get getLoggedUser(){
    return HeaderComponent.loggedUser;
  }

  
  

}
