import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePersonChartComponent } from './table-person-chart.component';

describe('TablePersonChartComponent', () => {
  let component: TablePersonChartComponent;
  let fixture: ComponentFixture<TablePersonChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePersonChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePersonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
