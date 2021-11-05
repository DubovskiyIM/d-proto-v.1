import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2, ViewChild
} from '@angular/core';
import {
  DynamicFormControlComponent,
  DynamicFormControlCustomEvent,
  DynamicFormLayoutService, DynamicFormValidationService
} from "@ng-dynamic-forms/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dynamic-custom-input',
  templateUrl: './dynamic-custom-input.component.html',
  styleUrls: ['./dynamic-custom-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DynamicCustomInputComponent extends DynamicFormControlComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() layout;
  @Input() model: any;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService,
              private elRef: ElementRef,
              private renderer: Renderer2
              ) {
    super(layoutService, validationService);
  }

  ngOnInit() {
    this.renderer.addClass(this.elRef.nativeElement.parentElement?.parentElement, this.getClass('grid', 'control'));
  }
}
