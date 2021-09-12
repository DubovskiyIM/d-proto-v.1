import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeedbacksListComponent } from './product-feedbacks-list.component';

describe('ProductFeedbacksListComponent', () => {
  let component: ProductFeedbacksListComponent;
  let fixture: ComponentFixture<ProductFeedbacksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFeedbacksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeedbacksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
