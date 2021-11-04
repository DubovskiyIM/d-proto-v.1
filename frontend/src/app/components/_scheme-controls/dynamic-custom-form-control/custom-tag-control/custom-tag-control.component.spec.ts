import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTagControlComponent } from './custom-tag-control.component';

describe('CustomTagControlComponent', () => {
  let component: CustomTagControlComponent;
  let fixture: ComponentFixture<CustomTagControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTagControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTagControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
