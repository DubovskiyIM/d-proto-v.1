import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-radio-group',
  templateUrl: './custom-radio-group.component.html',
  styleUrls: ['./custom-radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomRadioGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomRadioGroupComponent implements OnInit {
  @Input() name: string;
  @Input() group: FormGroup;
  @Input() model: any;
  public radioItems;

  constructor() { }

  ngOnInit(): void {
    this.radioItems = this.model.options.map((item) => {
      return {
        name: item?.value,
        label: item?.label,
        description: item?.description
      }
    });
    console.log(this.radioItems);
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  writeValue() {}
}
