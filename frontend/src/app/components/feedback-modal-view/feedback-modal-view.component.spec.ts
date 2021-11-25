import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackModalViewComponent } from './feedback-modal-view.component';

describe('FeedbackModalViewComponent', () => {
  let component: FeedbackModalViewComponent;
  let fixture: ComponentFixture<FeedbackModalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackModalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
