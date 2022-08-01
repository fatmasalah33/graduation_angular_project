import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcatogeryComponent } from './addcatogery.component';

describe('AddcatogeryComponent', () => {
  let component: AddcatogeryComponent;
  let fixture: ComponentFixture<AddcatogeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcatogeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcatogeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
