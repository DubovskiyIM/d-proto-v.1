import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCustomRadioGroupComponent } from './dynamic-custom-radio-group.component';

describe('DynamicCustomRadioGroupComponent', () => {
  let component: DynamicCustomRadioGroupComponent;
  let fixture: ComponentFixture<DynamicCustomRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCustomRadioGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCustomRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
