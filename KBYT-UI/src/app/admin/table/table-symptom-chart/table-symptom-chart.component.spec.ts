import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSymptomChartComponent } from './table-symptom-chart.component';

describe('TableSymptomChartComponent', () => {
  let component: TableSymptomChartComponent;
  let fixture: ComponentFixture<TableSymptomChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSymptomChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSymptomChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
