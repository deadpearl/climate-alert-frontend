import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireFormRealTimeReadonlyComponent } from './fire-form-real-time-readonly.component';

describe('FireFormRealTimeReadonlyComponent', () => {
  let component: FireFormRealTimeReadonlyComponent;
  let fixture: ComponentFixture<FireFormRealTimeReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireFormRealTimeReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireFormRealTimeReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
