import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CdkStepper} from "@angular/cdk/stepper";
import {tuiPure} from "@taiga-ui/cdk";
import {Observable, of, timer} from "rxjs";
import {map, mapTo, share, startWith, switchMap, tap} from 'rxjs/operators';
import {TuiFileLike} from "@taiga-ui/kit";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {TuiNotificationsService} from "@taiga-ui/core";
import {AuthenticationService} from "../../_services/authentication.service";

class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) {
  }
}

function convertRejected({file, reason}: RejectedFile): TuiFileLike {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    content: reason,
  };
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: CdkStepper}]
})
export class RegistrationComponent implements OnInit {
  @ViewChild("stepper", {static: false})
  stepper: any;

  isStepperLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  readonly avatarControl = new FormControl();
  readonly countries: ReadonlyArray<TuiCountryIsoCode> = [
    TuiCountryIsoCode.RU,
    TuiCountryIsoCode.KZ,
    TuiCountryIsoCode.UA,
    TuiCountryIsoCode.BY,
  ];

  countryIsoCode = TuiCountryIsoCode.RU;


  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.secondFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', []],
      about: ['', []],
      phone: [],
      dateOfBirth: [],
    });
  }

  secondStepSend() {
    console.log(this.secondFormGroup.controls);
  }

  public saveFirstStep() {
    // debugger;

    debugger;
    if (this.firstFormGroup.invalid) {
      return;
    }
    this.authenticationService.registration(this.firstFormGroup.controls).subscribe((res) => {
      console.log(res);
    });

    this.stepper.next();
    this.isStepperLinear = false;
    // this.firstFormGroup.disable();

    // this.stepper.next();
  }


  @tuiPure
  get loading$(): Observable<ReadonlyArray<File>> {
    return this.requests$.pipe(
      map(file => (file instanceof File ? [file] : [])),
      startWith([]),
    );
  }

  @tuiPure
  get rejected$(): Observable<ReadonlyArray<TuiFileLike>> {
    return this.requests$.pipe(
      map(file => (file instanceof RejectedFile ? [convertRejected(file)] : [])),
      tap(({length}) => {
        if (length) {
          this.avatarControl.setValue(null);
        }
      }),
      startWith([]),
    );
  }

  @tuiPure
  private get requests$(): Observable<RejectedFile | File | null> {
    return this.avatarControl.valueChanges.pipe(
      switchMap(file =>
        file ? this.serverRequest(file).pipe(startWith(file)) : of(null),
      ),
      share(),
    );
  }

  private serverRequest(file: File): Observable<RejectedFile | File | null> {
    const delay = Math.round(Math.random() * 5000 + 500);
    const result =
      delay % 2
        ? null
        : new RejectedFile(file, 'Server responded for odd number of time');

    return timer(delay).pipe(mapTo(result));
  }


  public pinRegistrationCard(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

  }


}
