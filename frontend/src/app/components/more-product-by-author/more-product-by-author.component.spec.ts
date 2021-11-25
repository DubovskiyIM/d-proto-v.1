import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreProductByAuthorComponent } from './more-product-by-author.component';

describe('MoreProductByAuthorComponent', () => {
  let component: MoreProductByAuthorComponent;
  let fixture: ComponentFixture<MoreProductByAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreProductByAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreProductByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
