import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoffersellerComponent } from './editofferseller.component';

describe('EditoffersellerComponent', () => {
  let component: EditoffersellerComponent;
  let fixture: ComponentFixture<EditoffersellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditoffersellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditoffersellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
