import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsChartComponent } from './persons-chart.component';

describe('PersonsChartComponent', () => {
  let component: PersonsChartComponent;
  let fixture: ComponentFixture<PersonsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
