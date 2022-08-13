import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerifiedProductComponent } from './not-verified-product.component';

describe('NotVerifiedProductComponent', () => {
  let component: NotVerifiedProductComponent;
  let fixture: ComponentFixture<NotVerifiedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotVerifiedProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotVerifiedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
