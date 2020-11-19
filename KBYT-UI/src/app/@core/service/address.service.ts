import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from '../baseUrl';
import { District } from '../models/district';
import { Province } from '../models/province';


@Injectable({
    providedIn: 'root',
})

export class AddressService {
    province: Province = new Province();
    distrist: District = new District();

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    listProvince(): Observable<any> {
        return this.http.get(`${baseUrl}/provinces`)
    }

    listDistrict(id_province: string): Observable<any> {
        return this.http.get(`${baseUrl}/districts/${id_province}`)
    }

    listWard(id_district: string): Observable<any> {
        return this.http.get(`${baseUrl}/wards/${id_district}`)
    }
}