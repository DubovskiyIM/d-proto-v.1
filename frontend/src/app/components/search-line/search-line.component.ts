import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiPaymentSystem} from "@taiga-ui/addon-commerce";

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLineComponent implements OnInit {
  readonly testForm = new FormGroup({
    testValue: new FormControl('mail@mail.ru'),
  });
  readonly paymentSystem = TuiPaymentSystem.Mir;
  readonly brandLogo = 'https://ng-web-apis.github.io/dist/assets/images/web-api.svg';
  readonly control = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);
  constructor() { }

  ngOnInit(): void {
  }

}
