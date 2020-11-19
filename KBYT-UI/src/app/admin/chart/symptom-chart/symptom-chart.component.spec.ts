import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomChartComponent } from './symptom-chart.component';

describe('SymptomChartComponent', () => {
  let component: SymptomChartComponent;
  let fixture: ComponentFixture<SymptomChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
