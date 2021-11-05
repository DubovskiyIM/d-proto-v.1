import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectControlComponent } from './custom-select-control.component';

describe('CustomSelectControlComponent', () => {
  let component: CustomSelectControlComponent;
  let fixture: ComponentFixture<CustomSelectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSelectControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
