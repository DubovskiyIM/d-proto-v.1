import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {
  DynamicFormControlComponent,
  DynamicFormControlCustomEvent,
  DynamicFormLayoutService,
  DynamicFormValidationService
} from "@ng-dynamic-forms/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dynamic-custom-select',
  templateUrl: './dynamic-custom-select.component.html',
  styleUrls: ['./dynamic-custom-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCustomSelectComponent extends DynamicFormControlComponent  {
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

  ngOnInit(): void {
  }

}
