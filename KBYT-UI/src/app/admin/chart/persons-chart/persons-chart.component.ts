import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Key } from 'protractor';
import { Chart } from 'chart.js'
import { Observable } from 'rxjs';
import { Person } from 'src/app/@core/models/person';
import { PersonService } from 'src/app/@core/service/person.service';
import { PersonComponent } from '../../table/person/person.component';


@Component({
  selector: 'app-persons-chart',
  templateUrl: './persons-chart.component.html',
  styleUrls: ['./persons-chart.component.scss']
})
export class PersonsChartComponent implements OnInit {
  endDate: string;
  startDate: string;
  datePerson: Date;
  DateNow: any;

  person: Person[];
  tperson: any;

  Date = [];
  Count = [];
  LineChart: Chart;

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.endDate = convert(new Date());

    let date = new Date();

    date.setDate(date.getDate() - 14)

    this.startDate = convert(date)
    this.DateNow = [(this.startDate), (this.endDate)]

  }

  ngAfterViewInit() {
    this.getPersons();

  }

  getTable() {
    this.router.navigate([`/admin/table-person-chart/${this.datePerson}`]);
  }


  getPersons() {
    let componentScope = this;

    this.personService.countPerson(this.startDate, this.endDate)
      .subscribe((result: Person[]) => {
        result.forEach(x => {
          this.Date.push(x.date);
          this.Count.push(x.count);
        });
        this.LineChart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.Date,
            datasets: [
              {
                data: this.Count,
                label: 'Số người khai báo trong ngày',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            onClick: function (e) {
              var activePoints = this.getElementAtEvent(e);
              var selectedIndex = activePoints[0]._index;
              componentScope.datePerson = this.data.labels[selectedIndex];
              componentScope.getTable();
            },
          },

        })

      });
    this.Date = [];
    this.Count = []
  }


  onChange(result: Date[]): void {
    this.startDate = convert(result[0])
    this.endDate = convert(result[1])
    this.getPersons()
  }


}


function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

