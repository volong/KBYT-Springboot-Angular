import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactChartComponent } from './contact-chart.component';

describe('ContactChartComponent', () => {
  let component: ContactChartComponent;
  let fixture: ComponentFixture<ContactChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
