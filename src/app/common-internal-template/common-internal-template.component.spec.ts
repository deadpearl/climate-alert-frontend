import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonInternalTemplateComponent } from './common-internal-template.component';

describe('CommonInternalTemplateComponent', () => {
  let component: CommonInternalTemplateComponent;
  let fixture: ComponentFixture<CommonInternalTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonInternalTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonInternalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
