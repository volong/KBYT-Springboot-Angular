import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { baseUrl } from '../baseUrl';
import { Person } from '../models/person';

@Injectable({
    providedIn: 'root',
})

export class PersonService {
    person: Person = new Person();

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    create(person: any) {
        return this.http.post(`${baseUrl}/person`, person)
    }

    create1(person: any) {
        return this.http.put(`${baseUrl}/person`, person)
    }

    findAll(pageIndex: number, pageSize: number): Observable<any> {
        return this.http.get(`${baseUrl}/all/persons/${pageSize}/${pageIndex}`)
    }

    findBasic(isDelete: number, pageIndex: number, pageSize: number): Observable<any> {
        return this.http.get(`${baseUrl}/basic/persons/${isDelete}/${pageSize}/${pageIndex}`)
    }


    findById(id_person: number | string): Observable<any> {
        return this.http.get(`${baseUrl}/person/${id_person}`)
    }

    findSymptomById(id_person: number | string): Observable<any> {
        return this.http.get(`${baseUrl}/symptom/${id_person}`)
    }

    findContactById(id_person: number | string): Observable<any> {
        return this.http.get(`${baseUrl}/contact/${id_person}`)
    }

    findSickById(id_person: number | string): Observable<any> {
        return this.http.get(`${baseUrl}/sick/${id_person}`)
    }

    findByPassport(passport_number: string): Observable<any> {
        return this.http.get(`${baseUrl}/person/passport/${passport_number}`)
    }

    findByDate(date: string, pageIndex: number, pageSize: number): Observable<any> {
        return this.http.get(`${baseUrl}/personbydate/${date}/${pageSize}/${pageIndex}`)
    }

    findBySymptom(startDate: string, endDate: string, id_symptom: number, pageIndex: number, pageSize: number): Observable<any> {
        return this.http.get(`${baseUrl}/symptomtable/${startDate}/${endDate}/${id_symptom}/${pageSize}/${pageIndex}`)
    }

    findByContact(startDate: string, endDate: string, id_contact: number, pageIndex: number, pageSize: number): Observable<any> {
        return this.http.get(`${baseUrl}/contacttable/${startDate}/${endDate}/${id_contact}/${pageSize}/${pageIndex}`)
    }

    delete(id_person: number | string) {
        return this.http.put(`${baseUrl}/delete`, id_person)
    }

    undelete(id_person: number | string) {
        return this.http.put(`${baseUrl}/undelete`, id_person)
    }

    countPerson(startDate: string, endDate: string): Observable<any> {
        return this.http.get(`${baseUrl}/countperson/${startDate}/${endDate}`)
    }

    countSymptom(startDate: string, endDate: string): Observable<any> {
        return this.http.get(`${baseUrl}/countsymptom/${startDate}/${endDate}`)
    }

    countContact(startDate: string, endDate: string): Observable<any> {
        return this.http.get(`${baseUrl}/countcontact/${startDate}/${endDate}`)
    }

    sumAll() {
        return this.http.get(`${baseUrl}/sumall`)
    }

    sumBasic(isDelete: number) {
        return this.http.get(`${baseUrl}/sumbasic/${isDelete}`)
    }

    sumPersonByDate(date: string) {
        return this.http.get(`${baseUrl}/sumpersonbydate/${date}`)
    }

    sumPersonBySymptom(startDate: string, endDate: string, id_symptom: number) {
        return this.http.get(`${baseUrl}/sumpersonbysymptom/${startDate}/${endDate}/${id_symptom}`)
    }

    sumPersonByContact(startDate: string, endDate: string, id_contact: number) {
        return this.http.get(`${baseUrl}/sumpersonbycontact/${startDate}/${endDate}/${id_contact}`)
    }


}
