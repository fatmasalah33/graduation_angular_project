import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcatogeryComponent } from './editcatogery.component';

describe('EditcatogeryComponent', () => {
  let component: EditcatogeryComponent;
  let fixture: ComponentFixture<EditcatogeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcatogeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcatogeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
