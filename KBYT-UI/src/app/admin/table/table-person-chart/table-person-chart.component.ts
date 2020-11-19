import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/@core/baseUrl';
import { Person } from 'src/app/@core/models/person';
import { PersonService } from 'src/app/@core/service/person.service';

@Component({
  selector: 'app-table-person-chart',
  templateUrl: './table-person-chart.component.html',
  styleUrls: ['./table-person-chart.component.scss']
})
export class TablePersonChartComponent implements OnInit {
  persons: Observable<Person[]>
  date: string


  pageSize = 7;
  pageIndex = 1
  total: number;


  constructor(private router: Router, private http: HttpClient, private personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.date = this.route.snapshot.paramMap.get('datePerson');
    this.countPageSize();
    this.getPerson()

  }

  countPageSize() {
    this.personService.sumPersonByDate(this.date)
      .subscribe(
        data => {
          this.total = +(data)
        }
      )
  }

  getPerson() {
    this.persons = this.personService.findByDate(this.date, this.pageIndex - 1, this.pageSize)
  }


  pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.countPageSize();
    if (this.pageIndex === 1) {
      this.persons = this.personService.findByDate(this.date, this.pageIndex - 1, this.pageSize)
    } else {
      this.persons = this.personService.findByDate(this.date, (this.pageIndex - 1) * this.pageSize, this.pageSize)
    }
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.countPageSize();
    if (this.pageIndex === 1) {
      this.persons = this.personService.findByDate(this.date, this.pageIndex - 1, pageSize)
    } else {
      this.persons = this.personService.findByDate(this.date, (this.pageIndex - 1) * pageSize, pageSize)
    }
  }


  personDetail(id_person: number) {
    this.router.navigate(['/admin/person', id_person])
  }

  delete(id_person: number) {
    var formData: any = new FormData();
    formData.append("id_person", id_person);
    this.http.put(`${baseUrl}/delete`, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    // this.message.success('Đã xoá tờ khai!');
    this.countPageSize();
    this.getPerson();
  }

}
