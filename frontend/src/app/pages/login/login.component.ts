import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', Validators.minLength(6)),
  });
  public resetPassword: FormGroup = new FormGroup({
    phone: new FormControl(),
  });
  public registrationForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    // phone: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('^[0-9]*$'),
    //   Validators.minLength(10),
    //   Validators.maxLength(10),
    // ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  pageState: string = 'login';
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  isLoginForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Вход');
  }

  ngOnInit() {
    // this.authenticationService.logout();
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/lk/account';
  }

  get f() {
    return this.loginForm.controls;
  }

  get reg() {
    return this.registrationForm.controls;
  }

  auth() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService
      .login(this.loginForm)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          if (data.token) {
            this.router.navigate(['/me']);
            //       const role = data.userRole[0];
            //       if (role === 'ROLE_ADMIN' || role === 'ROLE_SUPERVISOR') {
            //         this.router.navigate(['/manager/financial-documents']);
            //       } else {
            //         this.router.navigate([this.returnUrl]);
            //       }
          }
        },
        (error) => {
          this.error = error.message;
          this.loading = false;
          if (error.status === 401) {
            this.error = 'Войти не удалось';
          }
        }
      );
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
    console.log(this.registrationForm);
    if (this.registrationForm?.invalid) {
      return;
    }
    console.log('next->');
    this.authenticationService.registration(this.reg).subscribe((res) => {
      console.log(res);
    });
  }

  public login(): void {}

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
