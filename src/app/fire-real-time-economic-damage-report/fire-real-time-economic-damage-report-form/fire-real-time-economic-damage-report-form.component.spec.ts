import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireRealTimeEconomicDamageReportFormComponent } from './fire-real-time-economic-damage-report-form.component';

describe('FireRealTimeEconomicDamageReportFormComponent', () => {
  let component: FireRealTimeEconomicDamageReportFormComponent;
  let fixture: ComponentFixture<FireRealTimeEconomicDamageReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireRealTimeEconomicDamageReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireRealTimeEconomicDamageReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
