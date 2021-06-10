import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LkNavbarItemsComponent } from './lk-navbar-items.component';

describe('LkNavbarItemsComponent', () => {
  let component: LkNavbarItemsComponent;
  let fixture: ComponentFixture<LkNavbarItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LkNavbarItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LkNavbarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
