import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingAssignComponent } from './incoming-assign.component';

describe('IncomingAssignComponent', () => {
  let component: IncomingAssignComponent;
  let fixture: ComponentFixture<IncomingAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
