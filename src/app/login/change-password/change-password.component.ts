import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/admin/user/user';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userId : number;
  oldPswd : string;
  newPswd : string;
  cfnPswd : string;

  message : string = "";


  user: User;

  submitted = false;
  isSuccess : boolean = false;
  isFailure : boolean = false;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {

    this.userId = JSON.parse(sessionStorage.getItem('mmsUser') || '{"user":"Guest"}').user;
  }

  validateUser()
  {
    if(this.newPswd === this.cfnPswd)
    {
          this.authService.getUser(this.userId)
        .subscribe(data => {
          this.user = data;

          if(this.user.password === this.oldPswd)
          {
            this.user.password = this.newPswd;
            this.user.updatedUserId = this.userId.toString();
            this.update();
          }
          else{
            this.message = "Old password doesn't match our records....";
            this.isFailure = true;
          }
            
        }, error => console.log(error));
    }
    else
    {
        this.message = "Entered Password and Confirm Password does not match.. Try again....";
        this.isFailure = true;
    }
    
  }


  update()
  {
    this.authService.updateUser(this.userId, this.user).subscribe(
      data => {
              this.user = new User();
            this.isSuccess = true;
            this.formReset();
          },
        error => console.log(error)
    );
  }

  onSubmit() {
    this.submitted = true;
    this.validateUser(); 
  }

  formReset()
  {
    this.oldPswd = "";
    this.newPswd = "";
    this.cfnPswd = "";
  }

}

