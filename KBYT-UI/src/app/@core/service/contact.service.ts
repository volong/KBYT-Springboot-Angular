import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';
import { Contact } from '../models/contact';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    contact: Contact = new Contact()

    constructor(private router: Router, private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(`${baseUrl}/list/contact`)
    }
}