import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCustomFormControlComponent } from './dynamic-custom-form-control.component';

describe('DynamicCustomFormControlComponent', () => {
  let component: DynamicCustomFormControlComponent;
  let fixture: ComponentFixture<DynamicCustomFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCustomFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCustomFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
