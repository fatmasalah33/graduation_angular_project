import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductsellerComponent } from './addproductseller.component';

describe('AddproductsellerComponent', () => {
  let component: AddproductsellerComponent;
  let fixture: ComponentFixture<AddproductsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductsellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
