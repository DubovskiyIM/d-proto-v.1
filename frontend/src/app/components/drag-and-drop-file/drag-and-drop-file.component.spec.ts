import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropFileComponent } from './drag-and-drop-file.component';

describe('DragAndDropFileComponent', () => {
  let component: DragAndDropFileComponent;
  let fixture: ComponentFixture<DragAndDropFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
