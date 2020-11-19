import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';
import { Sick } from '../models/sick';

@Injectable({
    providedIn: 'root',
})

export class SickService {
    sick: Sick = new Sick();

    constructor(private router: Router, private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(`${baseUrl}/list/sick`)
    }

}