import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicFormControlComponent,
  DynamicFormControlCustomEvent,
  DynamicFormLayoutService,
  DynamicFormValidationService,
} from '@ng-dynamic-forms/core';

@Component({
  selector: 'app-dynamic-custom-file',
  templateUrl: './dynamic-custom-file.component.html',
  styleUrls: ['./dynamic-custom-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCustomFileComponent extends DynamicFormControlComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() layout;
  @Input() model: any;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  constructor(
    protected layoutService: DynamicFormLayoutService,
    protected validationService: DynamicFormValidationService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    super(layoutService, validationService);
  }

  ngOnInit(): void {
    if (this.elRef.nativeElement.parentElement?.parentElement) {
      this.renderer.addClass(this.elRef.nativeElement.parentElement?.parentElement, this.getClass('grid', 'control'));
    }
  }
}
