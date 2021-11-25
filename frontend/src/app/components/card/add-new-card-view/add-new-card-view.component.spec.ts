import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCardViewComponent } from './add-new-card-view.component';

describe('AddNewCardViewComponent', () => {
  let component: AddNewCardViewComponent;
  let fixture: ComponentFixture<AddNewCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
