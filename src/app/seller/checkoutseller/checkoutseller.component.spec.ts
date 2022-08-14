import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsellerComponent } from './checkoutseller.component';

describe('CheckoutsellerComponent', () => {
  let component: CheckoutsellerComponent;
  let fixture: ComponentFixture<CheckoutsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutsellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
