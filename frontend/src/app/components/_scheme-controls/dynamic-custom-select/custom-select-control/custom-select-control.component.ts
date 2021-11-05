import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TUI_DEFAULT_MATCHER, tuiPure} from "@taiga-ui/cdk";

const ITEMS: readonly string[] = [
  'Luke Skywalker',
  'Leia Organa Solo',
  'Darth Vader',
  'Han Solo',
  'Obi-Wan Kenobi',
  'Yoda',
];

@Component({
  selector: 'app-custom-select-control',
  templateUrl: './custom-select-control.component.html',
  styleUrls: ['./custom-select-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectControlComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomSelectControlComponent implements OnInit {
  @Input() name: string;
  @Input() group: FormGroup;
  @Input() model: any;
  public inputType: string = 'SELECT';
  public items;
  public search = ''
  // readonly control = new FormControl([ITEMS[0]]);

  constructor() {
  }

  ngOnInit(): void {
    // this.inputType = this.model?.name || 'SELECT';

    this.items = this.model?.options.map((item) => {
      return item.label
    });
    console.log(this.inputType);
    // console.log(this.inputType);
  }

  @tuiPure
  public filter(search: string | null): readonly string[] {
    return this.items.filter(item => TUI_DEFAULT_MATCHER(item, search || ''));
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  writeValue() {}

}
