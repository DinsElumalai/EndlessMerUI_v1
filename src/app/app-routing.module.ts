import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { EmplistComponent } from './master/employee/emplist/emplist.component';
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
import { UserAccessedpageComponent } from './admin/user-accessedpage/user-accessedpage.component';
import { UserLogComponent } from './admin/user-log/user-log.component';
import { UserPermissionComponent } from './admin/user-permission/user-permission.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { AppComponent } from './app.component';


const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'emp', component: EmployeeComponent },
  { path: 'emplist', component: EmplistComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'item', component: ItemComponent },
  { path: 'itemtype', component: ItemTypeComponent },
  { path: 'itemsubtype', component: ItemSubtypeComponent },
  { path: 'rcrn', component: RcrnComponent },
  { path: 'ppon', component: PponComponent },
  { path: 'rpan', component: RpanComponent },
  { path: 'pdrn', component: PdrnComponent },
  { path: 'prefix', component: PrefixSetupComponent },
  { path: 'software', component: SoftwareSetupComponent },
  { path: 'user', component: UserComponent },
  { path: 'useracpage', component: UserAccessedpageComponent },
  { path: 'userlog', component: UserLogComponent },
  { path: 'userper', component: UserPermissionComponent },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
