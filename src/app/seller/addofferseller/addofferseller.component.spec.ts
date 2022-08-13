import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoffersellerComponent } from './addofferseller.component';

describe('AddoffersellerComponent', () => {
  let component: AddoffersellerComponent;
  let fixture: ComponentFixture<AddoffersellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddoffersellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddoffersellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
