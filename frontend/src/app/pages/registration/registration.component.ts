import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CdkStepper} from "@angular/cdk/stepper";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStepper }]
})
export class RegistrationComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;



  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)]
    });

    this.secondFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', []],
      about: ['', []],
    });
  }

  secondStepSend() {
    console.log(this.secondFormGroup.controls);
  }







}
