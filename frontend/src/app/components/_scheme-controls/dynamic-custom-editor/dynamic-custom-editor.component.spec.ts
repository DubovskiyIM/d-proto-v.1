import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCustomEditorComponent } from './dynamic-custom-editor.component';

describe('DynamicCustomEditorComponent', () => {
  let component: DynamicCustomEditorComponent;
  let fixture: ComponentFixture<DynamicCustomEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCustomEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCustomEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
