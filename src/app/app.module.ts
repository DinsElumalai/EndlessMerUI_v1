import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HeaderModule } from './modules/header/header.module';
import { SidebarModule } from './modules/sidebar/sidebar.module';
import { ToggleSidebarModule } from './modules/toggle-sidebar/toggle-sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { DesignationComponent } from './master/designation/designation.component';
import { VendorComponent } from './master/vendor/vendor.component';
import { ItemComponent } from './master/item/item.component';
import { ItemTypeComponent } from './master/item-type/item-type.component';
import { ItemSubtypeComponent } from './master/item-subtype/item-subtype.component';
import { RcrnComponent } from './transaction/rcrn/rcrn.component';
import { PponComponent } from './transaction/ppon/ppon.component';
import { RpanComponent } from './transaction/rpan/rpan.component';
import { PdrnComponent } from './transaction/pdrn/pdrn.component';
import { PrefixSetupComponent } from './admin/prefix-setup/prefix-setup.component';
import { SoftwareSetupComponent } from './admin/software-setup/software-setup.component';
import { UserComponent } from './admin/user/user.component';
import { UserPermissionComponent } from './admin/user-permission/user-permission.component';
import { UserLogComponent } from './admin/user-log/user-log.component';
import { UserAccessedpageComponent } from './admin/user-accessedpage/user-accessedpage.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { ListUserComponent } from './admin/user/list-user/list-user.component';
import { EmplistComponent } from './master/employee/emplist/emplist.component';
import { EmpaddComponent } from './master/employee/empadd/empadd.component';
import { DesiglistComponent } from './master/designation/desiglist/desiglist.component';
import { DesigaddComponent } from './master/designation/desigadd/desigadd.component';
import { ItemlistComponent } from './master/item/itemlist/itemlist.component';
import { ItemaddComponent } from './master/item/itemadd/itemadd.component';
import { ItemsubtypeAddComponent } from './master/item-subtype/itemsubtype-add/itemsubtype-add.component';
import { ItemsubtypeListComponent } from './master/item-subtype/itemsubtype-list/itemsubtype-list.component';
import { ItemtypeListComponent } from './master/item-type/itemtype-list/itemtype-list.component';
import { ItemtypeAddComponent } from './master/item-type/itemtype-add/itemtype-add.component';
import { VendorAddComponent } from './master/vendor/vendor-add/vendor-add.component';
import { VendorListComponent } from './master/vendor/vendor-list/vendor-list.component';
import { PrefixListComponent } from './admin/prefix-setup/prefix-list/prefix-list.component';
import { PrefixAddComponent } from './admin/prefix-setup/prefix-add/prefix-add.component';
import { SoftwareAddComponent } from './admin/software-setup/software-add/software-add.component';
import { SoftwareListComponent } from './admin/software-setup/software-list/software-list.component';
import { UseracListComponent } from './admin/user-accessedpage/userac-list/userac-list.component';
import { UserlogListComponent } from './admin/user-log/userlog-list/userlog-list.component';
import { UserperListComponent } from './admin/user-permission/userper-list/userper-list.component';
import { UserperAddComponent } from './admin/user-permission/userper-add/userper-add.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { AddPdrnComponent } from './transaction/pdrn/add-pdrn/add-pdrn.component';
import { ListPdrnComponent } from './transaction/pdrn/list-pdrn/list-pdrn.component';
import { ListRcrnComponent } from './transaction/rcrn/list-rcrn/list-rcrn.component';
import { AddRcrnComponent } from './transaction/rcrn/add-rcrn/add-rcrn.component';
import { AddPponComponent } from './transaction/ppon/add-ppon/add-ppon.component';
import { ListPponComponent } from './transaction/ppon/list-ppon/list-ppon.component';
import { ListRpanComponent } from './transaction/rpan/list-rpan/list-rpan.component';
import { AddRpanComponent } from './transaction/rpan/add-rpan/add-rpan.component';
import { FilterPipe } from './filter.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilterPipe,
    LogoutComponent,
    EmployeeComponent,
    DesignationComponent,
    VendorComponent,
    ItemComponent,
    ItemTypeComponent,
    ItemSubtypeComponent,
    RcrnComponent,
    PponComponent,
    RpanComponent,
    PdrnComponent,
    PrefixSetupComponent,
    SoftwareSetupComponent,
    UserComponent,
    UserPermissionComponent,
    UserLogComponent,
    UserAccessedpageComponent,
    AddUserComponent,
    ListUserComponent,
    EmplistComponent,
    EmpaddComponent,
    DesiglistComponent,
    DesigaddComponent,
    ItemlistComponent,
    ItemaddComponent,
    ItemsubtypeAddComponent,
    ItemsubtypeListComponent,
    ItemtypeListComponent,
    ItemtypeAddComponent,
    VendorAddComponent,
    VendorListComponent,
    PrefixListComponent,
    PrefixAddComponent,
    SoftwareAddComponent,
    SoftwareListComponent,
    UseracListComponent,
    UserlogListComponent,
    UserperListComponent,
    UserperAddComponent,
    ChangePasswordComponent,
    AddPdrnComponent,
    ListPdrnComponent,
    ListRcrnComponent,
    AddRcrnComponent,
    AddPponComponent,
    ListPponComponent,
    ListRpanComponent,
    AddRpanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    LayoutModule,
    MatSidenavModule,
    DashboardModule,
    HeaderModule,
    SidebarModule,
    ToggleSidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
