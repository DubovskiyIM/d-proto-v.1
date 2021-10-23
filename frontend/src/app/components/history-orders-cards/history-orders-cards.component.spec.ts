import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrdersCardsComponent } from './history-orders-cards.component';

describe('HistoryOrdersCardsComponent', () => {
  let component: HistoryOrdersCardsComponent;
  let fixture: ComponentFixture<HistoryOrdersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOrdersCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOrdersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
