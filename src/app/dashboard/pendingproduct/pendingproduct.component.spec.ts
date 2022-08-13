import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingproductComponent } from './pendingproduct.component';

describe('PendingproductComponent', () => {
  let component: PendingproductComponent;
  let fixture: ComponentFixture<PendingproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
