import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional, Self,
  ViewChild
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
  private isPasswordHidden = true;

  @ViewChild(TuiPrimitiveTextfieldComponent)
  private readonly textfield?: TuiPrimitiveTextfieldComponent;

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
    return this.isPasswordHidden ? 'tuiIconHideLarge' : 'tuiIconShowLarge';
  }

  get hint(): string {
    return this.isPasswordHidden ? 'Show password' : 'Hide password';
  }

  get inputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  onValueChange(textValue: string) {
    this.updateValue(textValue);
  }

  onFocused(focused: boolean) {
    this.updateFocused(focused);
  }

  clickSearch() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  protected getFallbackValue(): string {
    return '';
  }
}
