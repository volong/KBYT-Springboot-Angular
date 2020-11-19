import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { NzMessageService } from 'ng-zorro-antd';
import { Person } from 'src/app/@core/models/person';
import { PersonService } from 'src/app/@core/service/person.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  person: Person = new Person();
  passport_number: string;
  form!: FormGroup;
  result = 0;


  constructor(private message: NzMessageService, public fb: FormBuilder, private router: Router, private route: ActivatedRoute, private personService: PersonService) {
    this.form = this.fb.group({
      passport_number: [],
    })
  }

  ngOnInit(): void {
    this.person = null;
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  search() {
    this.findPassport();
  }


  findPassport() {
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

  update(id_person: number) {
    this.router.navigate(['/update', id_person])
  }
}
