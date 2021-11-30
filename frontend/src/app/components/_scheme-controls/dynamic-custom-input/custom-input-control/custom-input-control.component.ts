import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input-control',
  templateUrl: './custom-input-control.component.html',
  styleUrls: ['./custom-input-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputControlComponent implements ControlValueAccessor, OnInit {
  @Input() name: string;
  @Input() group: FormGroup;
  @Input() model: any;
  inputType = 'text';

  constructor() {}

  ngOnInit(): void {
    this.inputType = this.model?.inputType ?? 'text';
    // console.log(this.inputType);
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  writeValue() {}
}
