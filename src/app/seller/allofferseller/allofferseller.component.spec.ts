import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlloffersellerComponent } from './allofferseller.component';

describe('AlloffersellerComponent', () => {
  let component: AlloffersellerComponent;
  let fixture: ComponentFixture<AlloffersellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlloffersellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlloffersellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
