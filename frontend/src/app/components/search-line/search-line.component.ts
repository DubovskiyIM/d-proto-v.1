import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional, Self,
  EventEmitter,
  ViewChild, Output
} from '@angular/core';
import {FormControl, FormGroup, NgControl, Validators} from "@angular/forms";
import {TuiPaymentSystem} from "@taiga-ui/addon-commerce";
import {AbstractTuiControl, TuiNativeFocusableElement} from "@taiga-ui/cdk";
import {TuiPrimitiveTextfieldComponent} from "@taiga-ui/core";

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLineComponent extends AbstractTuiControl<string> {

  @ViewChild(TuiPrimitiveTextfieldComponent)
  private readonly textfield?: TuiPrimitiveTextfieldComponent;

  @Output() searchClick = new EventEmitter<string>();

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
      control: NgControl | null,
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,

  ) {
    super(control, changeDetectorRef);
  }

  get nativeFocusableElement(): TuiNativeFocusableElement | null {
    return this.computedDisabled || !this.textfield
      ? null
      : this.textfield.nativeFocusableElement;
  }

  get focused(): boolean {
    return !!this.textfield && this.textfield.focused;
  }

  get icon(): string {
    return  'tuiIconSearch';
  }

  public onValueChange(textValue: string) {
    this.updateValue(textValue);
  }

  public onFocused(focused: boolean) {
    this.updateFocused(focused);
  }

  public clickSearch() {
    this.searchClick.emit(this.textfield?.value);
  }

  protected getFallbackValue(): string {
    return '';
  }
}
