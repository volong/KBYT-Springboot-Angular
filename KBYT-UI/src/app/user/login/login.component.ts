import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/@core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  errors: any = null;
  invalidCredentials: 'Xảy ra lỗi' | 'Tài khoản hoặc mật khẩu không hợp lệ' | null = null;
  model: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private message: NzMessageService,) { }

  comeHome() {
    // this.router.navigateByUrl('/login')
    this.router.navigate(['/'])
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.onSubmit();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get userNameErrors() {
    return this.validateForm.get('username').errors
  }

  get userNameErrorsString() {
    return JSON.stringify(this.userNameErrors)
  }

  onSubmit() {
    this.errors = {
      username: { ...this.userNameErrors }
    }

    console.log(this.validateForm)


    if (this.validateForm.invalid) return
    const account: Account = this.validateForm.value;

    // this.authService.signIn(account).subscribe(
    //   () => {
    //     this.router.navigateByUrl('/');
    //   },
    //   (err) => {
    //     if (err.status === 401) {
    //       this.invalidCredentials = 'Tài khoản hoặc mật khẩu không hợp lệ'
    //     } else {
    //       this.invalidCredentials = 'Xảy ra lỗi'
    //     }
    //   }
    // )

    this.authService.signIn(account).
      subscribe(
        isValid => {
          if (isValid) {
            this.router.navigateByUrl('/admin/table');
          }
        },
        (err => {
          if (err.status == 401) {
            this.authService.goToSignInPage()
          }
          this.message.error('Tài khoản hoặc mật khẩu sai!');

          return throwError(err)
        }
        ))
  }
}
