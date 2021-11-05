import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCustomSelectComponent } from './dynamic-custom-select.component';

describe('DynamicCustomSelectComponent', () => {
  let component: DynamicCustomSelectComponent;
  let fixture: ComponentFixture<DynamicCustomSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCustomSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
