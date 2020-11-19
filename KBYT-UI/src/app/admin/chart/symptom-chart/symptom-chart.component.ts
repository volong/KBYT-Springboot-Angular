import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/@core/models/person';
import { PersonService } from 'src/app/@core/service/person.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-symptom-chart',
  templateUrl: './symptom-chart.component.html',
  styleUrls: ['./symptom-chart.component.scss']
})
export class SymptomChartComponent implements OnInit {

  endDate: string;
  startDate: string;
  DateNow: any;
  datePerson: Date;
  id_symptom

  person: Person[];

  tperson: any;

  Count = [];
  ListSymptom = []
  SymptomId = []
  BarChart: Chart;

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.endDate = convert(new Date());

    let date = new Date();

    date.setDate(date.getDate() - 14)

    this.startDate = convert(date)

    this.DateNow = [(this.startDate), (this.endDate)]

  }

  getTable() {
    this.router.navigate([`/admin/table-symptom-chart/${this.startDate}/${this.endDate}/${this.id_symptom}`]);
  }

  ngAfterViewInit() {
    this.getPersons();
  }

  getPersons() {
    let componentScope = this;

    if (this.BarChart != null) {
      this.BarChart.destroy()
    }

    this.personService.countSymptom(this.startDate, this.endDate)
      .subscribe((result: Person[]) => {
        result.forEach(x => {
          this.ListSymptom.push(x.listSymptom);
          this.Count.push(x.count);
          this.SymptomId.push(x.symptomId)
        });
        this.BarChart = new Chart('canvas', {
          type: 'bar',
          data: {
            IdArray: this.SymptomId,
            labels: this.ListSymptom,
            datasets: [
              {
                data: this.Count,
                label: 'Số người có triệu chứng',
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
              componentScope.id_symptom = this.data.IdArray[selectedIndex];
              componentScope.getTable();
            },
          },

        })
        this.ListSymptom = [];
        this.Count = []
        this.SymptomId = []
      });

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

