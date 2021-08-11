import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightProfileNavbarComponent } from './right-profile-navbar.component';

describe('RightProfileNavbarComponent', () => {
  let component: RightProfileNavbarComponent;
  let fixture: ComponentFixture<RightProfileNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightProfileNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightProfileNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
