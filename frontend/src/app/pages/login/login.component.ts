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
import { NavigationService } from '../../_services/navigation.service';

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
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  pageState: string = 'login';
  returnUrl: string;
  error = '';
  isLoginForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: Title,
    private navigationService: NavigationService
  ) {
    this.titleService.setTitle('Вход');
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  get reg() {
    return this.registrationForm.controls;
  }

  public auth(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService
      .login(this.loginForm)
      .pipe(first())
      .subscribe(
        (user) => {
          if (user) {
            this.navigationService.next('profile');
          }
        },
        (error) => {
          this.error = error;
        }
      );
  }

  public changePageState(pageState: string) {
    this.pageState = pageState;
    this.isLoginForm = !this.isLoginForm;
  }

  public register(): void {
    if (this.registrationForm?.invalid) {
      return;
    }
    this.authenticationService.registration(this.reg).subscribe((res) => {
      console.log(res);
    });
  }


  public resetPass() {
  }
}
