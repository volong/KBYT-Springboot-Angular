import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/@core/models/contact';
import { Person } from 'src/app/@core/models/person';
import { Sick } from 'src/app/@core/models/sick';
import { Symptom } from 'src/app/@core/models/symptom';
import { PersonService } from 'src/app/@core/service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  person: Person
  id_person: number | string
  detail = false

  symptoms: Observable<Symptom[]>
  contacts: Observable<Contact[]>
  sicks: Observable<Sick[]>

  constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) { }

  ngOnInit(): void {
    this.getPerson();
    this.getSymptom();
    this.getContact();
    this.getSick();
  }

  getPerson() {
    this.id_person = this.route.snapshot.paramMap.get('id');

    this.personService.findById(this.id_person)
      .subscribe(data => {
        console.log(data)
        this.person = data;
      }, error => console.log(error));
  }


  getSymptom() {
    this.symptoms = this.personService.findSymptomById(this.id_person);
  }

  getContact() {
    this.contacts = this.personService.findContactById(this.id_person)
  }

  getSick() {
    this.sicks = this.personService.findSickById(this.id_person)
  }

  delete() {
    this.id_person = this.route.snapshot.paramMap.get('id');
    this.personService.delete(this.id_person).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  undelete() {
    this.id_person = this.route.snapshot.paramMap.get('id');
    this.personService.undelete(this.id_person).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

}
