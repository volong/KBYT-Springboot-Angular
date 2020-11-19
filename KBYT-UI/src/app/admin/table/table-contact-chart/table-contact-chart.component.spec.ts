import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContactChartComponent } from './table-contact-chart.component';

describe('TableContactChartComponent', () => {
  let component: TableContactChartComponent;
  let fixture: ComponentFixture<TableContactChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableContactChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContactChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
