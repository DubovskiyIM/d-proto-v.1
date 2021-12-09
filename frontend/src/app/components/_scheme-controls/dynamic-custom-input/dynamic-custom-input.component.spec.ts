import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCustomInputComponent } from './dynamic-custom-input.component';

describe('DynamicCustomInputComponent', () => {
  let component: DynamicCustomInputComponent;
  let fixture: ComponentFixture<DynamicCustomInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCustomInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
