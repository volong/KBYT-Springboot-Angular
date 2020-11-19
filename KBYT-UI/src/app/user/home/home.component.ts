import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzSafeAny } from 'ng-zorro-antd';
import { Observable, pipe } from 'rxjs';
import { baseUrl } from 'src/app/@core/baseUrl';
import { Contact } from 'src/app/@core/models/contact';
import { District } from 'src/app/@core/models/district';
import { Person } from 'src/app/@core/models/person';
import { Province } from 'src/app/@core/models/province';
import { Sick } from 'src/app/@core/models/sick';
import { Symptom } from 'src/app/@core/models/symptom';
import { Ward } from 'src/app/@core/models/ward';
import { AddressService } from 'src/app/@core/service/address.service';
import { ContactService } from 'src/app/@core/service/contact.service';
import { PersonService } from 'src/app/@core/service/person.service';
import { SickService } from 'src/app/@core/service/sick.service';
import { SymptomService } from 'src/app/@core/service/symptom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  person: Person = new Person();
  province: Province = new Province();

  disabled = 0;
  provinces: Observable<Province[]>;
  districts: Observable<District[]>;
  wards: Observable<Ward[]>;
  id_province: string;
  id_district: string;

  symptoms: Observable<Symptom[]>;
  contacts: Observable<Contact[]>;
  sicks: Observable<Sick[]>;
  khaiho = 0;
  currentId: number;
  id: number;
  passport_number: string;
  isSpinning = false;

  formSymptom: FormGroup;

  validateForm!: FormGroup;


  symptomArray = []
  contactArray = []
  sickArray = []

  constructor(private message: NzMessageService, public fb: FormBuilder, private http: HttpClient, private router: Router, private personService: PersonService, private addressService: AddressService,
    private sickService: SickService, private symptomService: SymptomService, private contactService: ContactService, private route: ActivatedRoute) {

    this.validateForm = this.fb.group({
      full_name: [],
      passport_number: [],
      phone_number: [''],
      email: [''],
      yob: [''],
      gender: [''],
      id_province: [''],
      id_district: [''],
      id_ward: [''],
      street: [''],
      act_in14days: [''],
      date: [''],
      declared: [1],
      is_delete: [0],
      khaiho: [0],
      id_person: [],
      param: [],
    })
  }



  khaihoChange(isChecked: boolean) {
    if (isChecked == true) {
      this.khaiho = 1
    } else {
      this.khaiho = 0
    }
  }

  ngOnInit() {
    this.initValidate();
    this.create();
    this.reloadData();
    // this.validForm()
  }


  create() {
    this.personService.create(this.person).subscribe(
      (data) => {
        this.currentId = +data;
      },
      (error) => console.log(error)
    );
    this.person = new Person();
  }

  reloadData() {
    this.provinces = this.addressService.listProvince();
    this.symptoms = this.symptomService.findAll();
    this.contacts = this.contactService.findAll();
    this.sicks = this.sickService.findAll();
  }

  loadDistricts(id_province: string) {
    this.districts = this.addressService.listDistrict(id_province);
  }

  loadWards(id_district: string) {
    this.wards = this.addressService.listWard(id_district)
  }

  provinceChange(result) {
    this.id_province = result;
    if (this.id_province != '') {
      this.loadDistricts(this.id_province);
      this.districtChange(result);
    }
  }

  districtChange(result) {
    this.id_district = result;
    if (this.id_district != '') {
      this.loadWards(this.id_district)
    }
  }

  login() {
    // this.router.navigateByUrl('/login')
    this.router.navigate(['/login'])
  }

  update() {
    this.id = +(<HTMLInputElement>document.getElementById("id")).value;
    var formData: any = new FormData();
    formData.append("id_person", this.id);
    formData.append("full_name", this.validateForm.get('full_name').value);
    formData.append("passport_number", this.validateForm.get('passport_number').value);
    formData.append("phone_number", this.validateForm.get('phone_number').value);
    formData.append("email", this.validateForm.get('email').value);
    formData.append("yob", convert(this.validateForm.get('yob').value));
    formData.append("gender", this.validateForm.get('gender').value);
    formData.append("id_province", this.validateForm.get('id_province').value);
    formData.append("id_district", this.validateForm.get('id_district').value);
    formData.append("id_ward", this.validateForm.get('id_ward').value);
    formData.append("street", this.validateForm.get('street').value);
    formData.append("act_in14days", this.validateForm.get('act_in14days').value);
    formData.append("date", convert(convert(Date.now())));
    formData.append("khaiho", this.khaiho);
    formData.append("declared", 1)
    formData.append("is_delete", 0)

    this.http.put(`${baseUrl}/person`, formData).subscribe(
      (response) => {
        console.log(response),
          this.message.success('Khai báo thành công');
      },
      (error) => {
        console.log(error),
          this.message.error('Khai báo thất bại, xin vui lòng thử lại!')
      }
    )
  }

  findPassport() {
    this.passport_number = this.validateForm.get('passport_number').value;

    this.personService.findByPassport(this.passport_number)
      .subscribe(
        (data) => {
          if (data != null) {
            this.message.info('Số CMND đã bị trùng với tờ khai khác, vui lòng kiểm tra lại!');
          } else {
            this.update()
            this.saveSymptom();
            this.saveContact();
            this.saveSick();
          }
        },
        (error) => {
          this.message.info('Số CMND đã bị trùng với tờ khai khác, vui lòng kiểm tra lại!');
        }
      )
  }



  submitForm(value: { full_name: string; email: string; cmnd: string; confirm: string; comment: string }): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.findPassport();

    } else {
      this.message.info('Vui lòng kiểm tra lại các trường bị bỏ trống');
    }
  }



  onChangeSymptom(id_symptom: number, isChecked: boolean) {
    if (isChecked) {
      this.symptomArray.push(id_symptom)
    } else {
      const index = this.symptomArray.indexOf(id_symptom);
      this.symptomArray.splice(index, 1)
    }
  }

  onChangeContact(id_contact: number, isChecked: boolean) {
    if (isChecked) {
      this.contactArray.push(id_contact)
    } else {
      const index = this.contactArray.indexOf(id_contact);
      this.contactArray.splice(index, 1)

    }
  }

  onChangeSick(id_sick: number, isChecked: boolean) {
    if (isChecked) {
      this.sickArray.push(id_sick)
    } else {
      const index = this.sickArray.indexOf(id_sick);
      this.sickArray.splice(index, 1)
    }
  }

  saveSymptom() {
    var formData: any = new FormData();
    formData.append("id_person", this.id);
    for (let i = 0; i < this.symptomArray.length; i++) {
      formData.append("param", this.symptomArray[i]);
    }
    this.http.post(`${baseUrl}/addsymptom`, formData).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    )
  }


  saveContact() {
    var formData: any = new FormData();
    formData.append("id_person", this.id);
    for (let i = 0; i < this.contactArray.length; i++) {

      formData.append("param", this.contactArray[i]);
    }
    this.http.post(`${baseUrl}/addcontact`, formData).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    )
  }

  saveSick() {
    var formData: any = new FormData();
    formData.append("id_person", this.id);
    for (let i = 0; i < this.sickArray.length; i++) {
      formData.append("param", this.sickArray[i]);
    }
    this.http.post(`${baseUrl}/addsick`, formData).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    )
  }



  autoTips: Record<string, Record<string, string>> = {
    vn: {
      required: 'Trường này không thể trống!'
    },
  };

  initValidate() {
    const { required, maxLength, minLength, Name, CMND, email, mobile } = MyValidators;
    this.validateForm = this.fb.group({
      full_name: ['', [required, Name]],
      passport_number: ['', [required, CMND]],
      phone_number: ['', [required, mobile]],
      email: ['', [email]],
      yob: ['', [required]],
      gender: ['', [required]],
      id_province: ['', [required]],
      id_district: ['', [required]],
      id_ward: ['', [required]],
      street: ['', [Validators.required]],
      act_in14days: [],

    });
  }

}

export class MyValidators extends Validators {


  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { vn: `Số điện thoại không hợp lệ` } };
  }

  static email(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isEmail(value) ? null : { email: { vn: `Email không hợp lệ` } };
  }


  static CMND(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isCMND(value) ? null : { cmnd: { vn: `Số CMND không hợp lệ` } };
  }

  static Name(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isName(value) ? null : { cmnd: { vn: `Họ tên không hợp lệ` } };
  }

}



//format yyyy-MM-dd
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");

}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /((09|03|07|08|05)+([0-9]{8})\b)/g.test(value);
}

function isCMND(value: string): boolean {
  return typeof value === 'string' && /(([0-9]{8})\b)/g.test(value);
}

function isEmail(value: string): boolean {
  return typeof value === 'string' && ' ' && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/igm
    .test(value);
}

function isName(value: string): boolean {
  return typeof value === 'string' && ' ' && /(([a-z])\b)/g
    .test(value);
}


export type MyErrorsOptions = { vn: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

