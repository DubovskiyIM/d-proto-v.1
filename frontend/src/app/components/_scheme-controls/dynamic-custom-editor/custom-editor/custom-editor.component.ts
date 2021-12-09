import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {
  defaultEditorExtensions,
  tiptapEditorStyles,
  TUI_EDITOR_EXTENSIONS,
  TUI_EDITOR_STYLES
} from "@taiga-ui/addon-editor";

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.scss'],
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
    {
      provide: TUI_EDITOR_STYLES,
      useValue: tiptapEditorStyles,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomEditorComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomEditorComponent implements  ControlValueAccessor {
  @Input() name;
  @Input() group;

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
