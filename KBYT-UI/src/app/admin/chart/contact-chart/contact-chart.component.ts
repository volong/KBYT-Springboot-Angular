import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js'
import { Person } from 'src/app/@core/models/person';
import { PersonService } from 'src/app/@core/service/person.service';


@Component({
  selector: 'app-contact-chart',
  templateUrl: './contact-chart.component.html',
  styleUrls: ['./contact-chart.component.scss']
})
export class ContactChartComponent implements OnInit {
  endDate: string;
  startDate: string;
  datePerson: Date;

  person: Person[];
  DateNow: any;

  tperson: any;
  id_contact: number;

  Count = [];
  ListContact = []
  ContactId = []

  IdArray = []
  PieChart: Chart;

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
    this.router.navigate([`/admin/table-contact-chart/${this.startDate}/${this.endDate}/${this.id_contact}`]);
  }

  onChange(result: Date[]): void {
    this.startDate = convert(result[0])
    this.endDate = convert(result[1])
    this.getPersons()
  }

  getPersons() {
    if (this.PieChart != null) {
      this.PieChart.destroy()
    }
    let componentScope = this;

    this.personService.countContact(this.startDate, this.endDate)
      .subscribe((result: Person[]) => {
        result.forEach(x => {
          this.ListContact.push(x.listContact);
          this.Count.push(x.count);
          this.ContactId.push(x.contactId)
        });
        this.PieChart = new Chart('canvas', {
          type: 'pie',
          data: {
            IdArray: this.ContactId,
            labels: this.ListContact,
            datasets: [
              {
                data: this.Count,
                label: 'Biểu đồ về Tiếp xúc',
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
              componentScope.id_contact = this.data.IdArray[selectedIndex];
              componentScope.getTable();
            },
          },

        })
        this.ListContact = [];
        this.Count = []
        this.ContactId = []

      });

  }



}
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
