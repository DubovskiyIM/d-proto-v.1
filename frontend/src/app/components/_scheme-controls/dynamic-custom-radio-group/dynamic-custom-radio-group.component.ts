import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {
  DynamicFormControlComponent,
  DynamicFormControlCustomEvent,
  DynamicFormLayoutService, DynamicFormValidationService
} from "@ng-dynamic-forms/core";

@Component({
  selector: 'app-dynamic-custom-radio-group',
  templateUrl: './dynamic-custom-radio-group.component.html',
  styleUrls: ['./dynamic-custom-radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCustomRadioGroupComponent extends DynamicFormControlComponent {
  @Input() group: FormGroup;
  @Input() layout;
  @Input() model: any;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
    super(layoutService, validationService);
  }

}
