import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyproductComponent } from './verfiyproduct.component';

describe('VerfiyproductComponent', () => {
  let component: VerfiyproductComponent;
  let fixture: ComponentFixture<VerfiyproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerfiyproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiyproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
