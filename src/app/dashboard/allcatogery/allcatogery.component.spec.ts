import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcatogeryComponent } from './allcatogery.component';

describe('AllcatogeryComponent', () => {
  let component: AllcatogeryComponent;
  let fixture: ComponentFixture<AllcatogeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcatogeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcatogeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
