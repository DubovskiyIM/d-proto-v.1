import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    "username": new FormControl(),
    "password": new FormControl()
  });
  pageState: string = 'login';
  resetPassword: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  isLoginForm = true;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private titleService: Title) {
    this.titleService.setTitle('Вход');
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
    // this.resetPassword = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    // });
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/lk/account';
  }

  get f() {
    return this.loginForm.controls;
  }

  get r() {
    return this.resetPassword.controls;
  }

  onSubmit() {
    this.loading = true;
    // if (this.currentInfo) {
    //   this.authenticationService.getStrForLogin().subscribe((res: any) => {
    //     if (res.id) {
    //       const data = btoa(res.string);
    //       const thumbprint = this.currentInfo.Thumbprint;
    //       this.cryptopro.signData(data, thumbprint)
    //         .then(sign => {
    //           this.authenticationService.loginCert(res.id, sign).subscribe((result: any) => {
    //             const role = result.userRole[0];
    //             if (role === 'ROLE_ADMIN' || role === 'ROLE_SUPERVISOR') {
    //               this.router.navigate(['/manager/financial-documents']);
    //             } else {
    //               this.router.navigate([this.returnUrl]);
    //             }
    //           });
    //         }).catch(e => {
    //         this.notifier.notify('error', e);
    //         this.loading = false;
    //       });
    //     }
    //   });
    // } else {
    //   this.authLogin();
    // }
  }


  authLogin() {
    // this.submitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       const role = data.userRole[0];
    //       if (role === 'ROLE_ADMIN' || role === 'ROLE_SUPERVISOR') {
    //         this.router.navigate(['/manager/financial-documents']);
    //       } else {
    //         this.router.navigate([this.returnUrl]);
    //       }
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //       if (error.status === 401) {
    //         this.error = 'Войти не удалось';
    //       }
    //     });
  }

  public changePageState(pageState: string) {
    this.pageState = pageState;
    this.isLoginForm = !this.isLoginForm;
  }

  forgotPasswordShow() {
    this.isLoginForm = !this.isLoginForm;
    this.loginForm.reset();
    this.resetPassword.reset();
    this.error = '';
  }

  public register(): void {
  }

  public login(): void {

  }

  resetPass() {
    //   this.alertSuccess = '';
    //   this.errorReset = '';
    //   this.submittedReset = true;
    //   if (this.resetPassword.invalid) {
    //     return;
    //   }
    //   this.authenticationService.resetPassword(this.r.email.value).subscribe((res: any) => {
    //     this.alertSuccess = 'Пароль для авторизации отправлен на указанную почту';
    //   }, (error) => {
    //     if (error.status === 404) {
    //       this.errorReset = 'Пользователь с таким логином не найден';
    //     } else {
    //       this.errorReset = 'Ошибка';
    //     }
    //   });
  }

}
