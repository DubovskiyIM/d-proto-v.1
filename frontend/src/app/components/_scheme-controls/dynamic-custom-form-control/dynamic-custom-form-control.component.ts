import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, Renderer2,
  ViewChild
} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {
  DynamicFormControlComponent,
  DynamicFormControlCustomEvent,
  DynamicFormLayout,
  DynamicFormLayoutService,
  DynamicFormValidationService,
} from "@ng-dynamic-forms/core";
import {CustomTagControlComponent} from './custom-tag-control/custom-tag-control.component'
import {TuiInputTagComponent} from "@taiga-ui/kit";

@Component({
  selector: 'app-dynamic-custom-form-control',
  templateUrl: './dynamic-custom-form-control.component.html',
  styleUrls: ['./dynamic-custom-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCustomFormControlComponent extends DynamicFormControlComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() layout;
  @Input() model: any;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  constructor(protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService,
              private elRef: ElementRef,
              private renderer: Renderer2) {
    super(layoutService, validationService);
  }

  ngOnInit() {
    this.renderer.addClass(this.elRef.nativeElement.parentElement?.parentElement, this.getClass('grid', 'control'));
  }
}
