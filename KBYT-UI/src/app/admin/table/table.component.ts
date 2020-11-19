import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/@core/baseUrl';
import { Person } from 'src/app/@core/models/person';
import { PersonService } from 'src/app/@core/service/person.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  persons: Observable<Person[]>
  total: number;

  loading = false;
  pageSize = 7;
  pageIndex = 1

  person: Person = new Person();
  form: FormGroup;
  passport_number: string;
  result = 0;

  visible = false;

  table = 3;

  detail = false
  id_person: any;
  route: any;
  isDelete = null;


  constructor(private message: NzMessageService, public fb: FormBuilder, private router: Router, private personService: PersonService, private http: HttpClient) {
    this.form = this.fb.group({
      id_person: [],
      passport_number: [],
    })
  }


  ngOnInit(): void {
    this.getPerson();
    this.coutPageSize()
  }



  reloadPersons() {
    this.coutPageSize();
    if (this.isDelete === null) {
      if (this.pageIndex === 1) {
        this.persons = this.personService.findAll(this.pageIndex - 1, this.pageSize)
      } else {
        this.persons = this.personService.findAll((this.pageIndex - 1) * this.pageSize, this.pageSize)
      }
    } else if (this.pageIndex === 1) {
      this.persons = this.personService.findBasic(this.isDelete, this.pageIndex - 1, this.pageSize)
    }
  }

  pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.coutPageSize();
    if (this.isDelete === null) {
      if (this.pageIndex === 1) {
        this.persons = this.personService.findAll(this.pageIndex - 1, this.pageSize)
      } else {
        this.persons = this.personService.findAll((this.pageIndex - 1) * this.pageSize, this.pageSize)
      }
    } else if (this.pageIndex === 1) {
      this.persons = this.personService.findBasic(this.isDelete, this.pageIndex - 1, this.pageSize)
    } else {
      this.persons = this.personService.findBasic(this.isDelete, (this.pageIndex - 1) * this.pageSize, this.pageSize)
    }
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.coutPageSize();
    if (this.isDelete === null) {
      if (this.pageIndex === 1) {
        this.persons = this.personService.findAll(this.pageIndex - 1, pageSize)
      } else {
        this.persons = this.personService.findAll((this.pageIndex - 1) * pageSize, pageSize)
      }
    } else if (this.pageIndex === 1) {
      this.persons = this.personService.findBasic(this.isDelete, this.pageIndex - 1, pageSize)
    } else {
      this.persons = this.personService.findBasic(this.isDelete, (this.pageIndex - 1) * pageSize, pageSize)
    }

  }

  getPerson() {
    this.persons = this.personService.findAll(this.pageIndex - 1, this.pageSize)
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
    this.message.success('Đã xoá tờ khai!');
    this.coutPageSize();
    this.reloadPersons();
  }



  undelete(id_person: number) {
    var formData: any = new FormData();
    formData.append("id_person", id_person);
    this.http.put(`${baseUrl}/undelete`, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    this.message.success('Đã khôi phục tờ khai!');
    this.coutPageSize();
    this.reloadPersons();
  }

  coutPageSize() {
    if (this.isDelete === null) {
      this.personService.sumAll()
        .subscribe(
          data => {
            this.total = +(data)
          }
        )
    } else {
      this.personService.sumBasic(this.isDelete)
        .subscribe(
          data => {
            this.total = +(data)
          }
        )
    }
  }


  search() {
    this.passport_number = this.form.get('passport_number').value;
    var formData: any = new FormData();

    this.personService.findByPassport(this.passport_number)
      .subscribe(
        (data) => {
          if (data != null) {
            this.person = data,
              this.resultTrue()
          } else {
            this.resultFalse()
          }
        },
        (error) => {
          this.resultFalse()

        }
      )
  }

  resultTrue() {
    this.result = 1;
  }

  resultFalse() {
    this.message.info('Không tìm thấy tờ khai!');
    this.result = 0;
  }

  tableChange(value: number) {
    this.table = [value][0];
    if (this.table == 3) {
      this.isDelete = null
    } else {
      this.isDelete = this.table
    }
    this.reloadPersons();
  }

}
