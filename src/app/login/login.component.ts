import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  constructor ( private authService: AuthService, private router: Router, private fb: FormBuilder,private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['testing', [Validators.required]],
      password: ['Test@Test', [Validators.required]]
    });
  }
  onSubmit (): void {
    if ( this.loginForm.valid ) {
      this.authService.login( this.loginForm.value ).subscribe( res => {
        console.log( res )
        res.user ? this.toastr.success( "Logged in Successfully", "Success" ) : this.toastr.error( "Something Went Wrong", "Error" );
      });
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
