import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-tag-control',
  templateUrl: './custom-tag-control.component.html',
  styleUrls: ['./custom-tag-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTagControlComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTagControlComponent implements  ControlValueAccessor {
  @Input() name;
  @Input() group;
  @Input() label = '';

  constructor() { }

  ngOnInit(): void {
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  writeValue() {

  }

}
