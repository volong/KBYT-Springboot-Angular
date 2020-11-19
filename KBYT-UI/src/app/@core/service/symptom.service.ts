import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';
import { Contact } from '../models/contact';
import { Sick } from '../models/sick';
import { Symptom } from '../models/symptom';

@Injectable({
    providedIn: 'root',
})

export class SymptomService {
    symptom: Symptom = new Symptom();

    constructor(private router: Router, private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(`${baseUrl}/list/symptom`)
    }

    countSymptom(startDate: any, endDate: any): Observable<any> {
        return this.http.get(`${baseUrl}/countsymptom/${startDate}/${endDate}`)
    }
}