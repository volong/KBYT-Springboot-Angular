import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/@core/baseUrl';
import { Contact } from 'src/app/@core/models/contact';
import { District } from 'src/app/@core/models/district';
import { Person } from 'src/app/@core/models/person';
import { Province } from 'src/app/@core/models/province';
import { Sick } from 'src/app/@core/models/sick';
import { Symptom } from 'src/app/@core/models/symptom';
import { TSymptom } from 'src/app/@core/models/tsymptom';
import { Ward } from 'src/app/@core/models/ward';
import { AddressService } from 'src/app/@core/service/address.service';
import { ContactService } from 'src/app/@core/service/contact.service';
import { PersonService } from 'src/app/@core/service/person.service';
import { SickService } from 'src/app/@core/service/sick.service';
import { SymptomService } from 'src/app/@core/service/symptom.service';
import { map } from 'rxjs/operators';
import { TContact } from 'src/app/@core/models/tcontact';
import { TSick } from 'src/app/@core/models/tsick';
import { NzMessageService, NzModalService, NzSafeAny } from 'ng-zorro-antd';
import { access } from 'fs';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  id: number;

  person: Person;
  id_person: number | string;
  provinces: Observable<Province[]>;
  tprovinces: Observable<Province[]>;

  districts: Observable<District[]>;
  wards: Observable<Ward[]>;
  id_province: string;
  id_district: string;

  symptom: [];

  symptoms: any;
  tsymptoms: Observable<TSymptom[]>;

  contacts: any;
  tcontacts: Observable<TContact[]>;

  sicks: any;
  tsicks: Observable<TSick[]>;
  form!: FormGroup;

  validateForm!: FormGroup;

  yob: any;
  isSpinning = false;
  khaiho: number;
  checkCurrent: boolean;

  symptomArray = []
  symptomUnchecked = []
  symptomChecked = []

  contactArray = []
  contactUnchecked = []
  contactChecked = []

  sickArray = []
  sickUnchecked = []
  sickChecked = []

  ListIdProvince: []
  ListProvince: []

  provinceID: string;
  districtID: string;

  constructor(private modal: NzModalService, private message: NzMessageService, public fb: FormBuilder, private http: HttpClient, private router: Router, private personService: PersonService, private addressService: AddressService,
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
      date: convert(Date.now()),
      declared: [1],
      is_delete: [0],
      khaiho: [0],
      id_person: [],
      id_symptom: [],
      param: [],
      id1: [],
      id2: [],
      id3: [],
      id4: [],
      id5: [],
      id6: []
    })
  }

  setValue() {
    this.validateForm.patchValue({
      full_name: this.person.fullName,
      passport_number: this.person.passportNumber,
      phone_number: this.person.phoneNumber,
      email: this.person.email,
      yob: this.person.yob,
      gender: this.person.gender,
      id_province: this.person.province.id_province,
      id_district: this.person.district.id_district,
      id_ward: this.person.ward.id_ward,
      street: this.person.street,
      act_in14days: this.person.actIn14days
    })
  }

  ngOnInit(): void {
    this.id_person = this.route.snapshot.paramMap.get('id');
    this.getPerson()
    this.reloadData();
    this.initValidate()
  }



  reloadData() {
    this.loadProvinces();
    this.getSymptomsChecked();
    this.getSymptomsUnchecked();
    this.getContactChecked();
    this.getContactUnchecked();
    this.getSickChecked();
    this.getSickUncheck();
  }


  //-------------------------- Triệu chứng----------------------

  // Lấy danh sách triệu chứng đã checked
  getSymptomsChecked() {
    this.personService.findSymptomById(this.id_person)
      .subscribe(
        (data => {
          this.tsymptoms = data
          for (let i = 0; i < data.length; i++) {
            this.symptomChecked.push(data[i].listSymptom.id_symptom)
          }
          this.getSymptomsUnchecked();
        }
        )
      )
  }

  // Lấy danh sách triệu chứng chưa được checked
  getSymptomsUnchecked() {
    var formData: any = new FormData();

    for (let i = 0; i < 6; i++) {
      if (i < this.symptomChecked.length) {
        formData.append(`id${i + 1}`, this.symptomChecked[i]);
      } else {
        formData.append(`id${i + 1}`, 0);
      }
    }
    this.http.put(`${baseUrl}/otherlist/symptom`, formData)
      .subscribe(
        (data) => this.symptoms = data
      )
  }

  // ----------------------------------------------------------



  //-------------------------- Tiếp xúc ----------------------

  // Lấy danh sách tiếp xúc đã checked

  getContactChecked() {
    this.personService.findContactById(this.id_person)
      .subscribe(
        (data => {
          this.tcontacts = data
          for (let i = 0; i < data.length; i++) {
            this.contactChecked.push(data[i].listContact.id_contact)
          }
          this.getContactUnchecked();
        }
        )
      )
  }

  // Lấy danh sách tiếp xúc chưa được checked
  getContactUnchecked() {
    var formData: any = new FormData();

    for (let i = 0; i < 3; i++) {
      if (i < this.contactChecked.length) {
        formData.append(`id${i + 1}`, this.contactChecked[i]);
      } else {
        formData.append(`id${i + 1}`, 0);
      }
    }
    this.http.put(`${baseUrl}/otherlist/contact`, formData)
      .subscribe(
        (data) => this.contacts = data
      )
  }
  //----------------------------------------------------------


  //-------------------------- Bệnh ----------------------

  // Lấy danh sách bệnh đã checked

  getSickChecked() {
    this.personService.findSickById(this.id_person)
      .subscribe(
        (data => {
          this.tsicks = data
          for (let i = 0; i < data.length; i++) {
            this.sickChecked.push(data[i].listSick.id_sick)
          }
          this.getSickUncheck();
        }
        )
      )
  }

  // Lấy danh sách bệnh chưa được checked
  getSickUncheck() {
    var formData: any = new FormData();

    for (let i = 0; i < 10; i++) {
      if (i < this.sickChecked.length) {
        formData.append(`id${i + 1}`, this.sickChecked[i]);
      } else {
        formData.append(`id${i + 1}`, 0);
      }
    }
    this.http.put(`${baseUrl}/otherlist/sick`, formData)
      .subscribe(
        (data) => this.sicks = data
      )
  }

  //----------------------------------------------------------


  //-------------Lấy và xử lí sự kiện cho Province, District và Ward------
  loadProvinces() {
    this.provinces = this.addressService.listProvince();
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
  //----------------------------------------------------------------------

  saveOption() {
    this.saveSymptom();
    this.saveContact();
    this.saveSick();
  }

  onChangeSymptom(id_symptom: number, isChecked: boolean) {
    if (isChecked) {
      this.symptomChecked.push(id_symptom)
    } else {
      const index = this.symptomChecked.indexOf(id_symptom);
      this.symptomChecked.splice(index, 1)
    }
  }

  onChangeContact(id_contact: number, isChecked: boolean) {
    if (isChecked) {
      this.contactChecked.push(id_contact)
    } else {
      const index = this.contactChecked.indexOf(id_contact);
      this.contactChecked.splice(index, 1)
    }
  }

  onChangeSick(id_sick: number, isChecked: boolean) {
    if (isChecked) {
      this.sickChecked.push(id_sick)
    } else {
      const index = this.sickChecked.indexOf(id_sick);
      this.sickChecked.splice(index, 1)
    }
  }

  saveSymptom() {
    var formData: any = new FormData();
    formData.append("id_person", this.id_person);
    for (let i = 0; i < this.symptomChecked.length; i++) {
      formData.append("param", this.symptomChecked[i]);
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
    formData.append("id_person", this.id_person);
    for (let i = 0; i < this.contactChecked.length; i++) {

      formData.append("param", this.contactChecked[i]);
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
    formData.append("id_person", this.id_person);
    for (let i = 0; i < this.sickChecked.length; i++) {
      formData.append("param", this.sickChecked[i]);
    }
    this.http.post(`${baseUrl}/addsick`, formData).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    )
  }
  // ------------Lấy thông tin tờ khai theo id_person-------
  getPerson() {
    this.personService.findById(this.id_person)
      .subscribe(
        (data) => {
          this.person = data;
          this.loadDistricts(this.person.province.id_province)
          this.loadWards(this.person.district.id_district)
          this.khaiho = this.person.khaiho;
          this.yob = this.person.yob;
          this.setValue();
        },
        (error) => console.log(error)
      )
  }
  // -----------------------------------------


  clickKhaiho() {
    if (this.khaiho === 0) {
      this.khaiho = 1
    } else if (this.khaiho === 1) {
      this.khaiho = 0
    }
  }

  onChangeDate(result: Date): void {
    this.yob = convert(result)
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Cập nhật tờ khai?</i>',
      nzOnOk: () => this.loadOne()
    });
  }


  submitForm(value: { full_name: string; email: string; cmnd: string; confirm: string; comment: string }): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }


    if (this.validateForm.valid) {
      this.showConfirm()
    } else {
      this.message.info('Các trường thông tin chưa hợp lệ');
    }
  }


  loadOne(): void {
    this.isSpinning = true;
    this.deleteOption();
  }

  refresh(): void {
    window.location.reload();
  }


  access: number
  deleteOption() {
    let optionArray = ["symptom", "contact", "sick", "save", 'update', 'refesh']
    var formData: any = new FormData();
    formData.append("id_person", this.id_person);

    for (let i = 0; i < optionArray.length; i++) {
      if (i < 3) {
        this.http.put(`${baseUrl}/delete/${optionArray[i]}`, formData).subscribe(
          (response) => {
            if (i === 2) {
              this.saveOption();
            }
            console.log(response)
          },
          (error) => {
            console.log(error)
          }
        )
      }
      // else if (i === 3) {
      //     this.saveOption()
      //   }
      else if (i === 4) {
        this.update();
      }
      else if (i === 5) {

        this.modal.success({
          nzTitle: 'Cập nhật tờ khai thành công',
          nzOnOk: () => this.refresh()
        });
      }
    }

  }

  update() {
    var formData: any = new FormData();
    formData.append("id_person", this.id_person);
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
        console.log(response)
      },
      (error) => {
        console.log(error),
          this.message.error('Khai báo thất bại, xin vui lòng thử lại!')
      }
    )
  }

  backHome() {
    this.router.navigate(['/'])
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

