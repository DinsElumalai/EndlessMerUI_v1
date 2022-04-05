import { UserPermissionComponent } from './user-permission.component';

export class UserPermission
{
    id : number;
    employeeId : string;
    page : string;
    readAccess : boolean;
    editAccess : boolean;
    deleteAccess : boolean;
    exportPdfReports : boolean;
    exportExcelReports : boolean;
    specialPermission1 : boolean;
    specialPermission2 : boolean;
    specialPermission3 : boolean;

}

export class UserGroup
{
    roleGroupId : number;
    roleGroupName : string;
    roleName : string;
    createdUserId :string;
    createdDate : string;
    updatedUserId :string;
    updatedDate : string;
    createdClient : string;
}


	