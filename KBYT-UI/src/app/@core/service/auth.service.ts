import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Router, CanActivate } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service'
import { baseUrl } from '../baseUrl';



const AUTH_TOKEN = 'AUTH_TOKEN'
const AUTH_DETAIL = 'AUTH_DETAIL'

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    tokenSubject = new BehaviorSubject<string>(null);
    authDetailSubject = new BehaviorSubject<any>({});

    constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) {
        const token = this.tokenFromCookie || ''
        console.log(this.tokenFromCookie
        )
        this.tokenSubject.next(token)

        // this.authDetailSubject.next(!!token ? this.getAuthDetailFromToken(token) : {})


    }

    get authDetail$() {
        return this.authDetailSubject.asObservable();
    }

    get token$() {
        return this.tokenSubject.asObservable();
    }

    get tokenFromCookie() {
        return this.cookieService.get(AUTH_TOKEN)
    }

    get authDetailFromCookie() {
        return JSON.parse(this.cookieService.get(AUTH_DETAIL) || '{}')
    }

    goToSignInPage() {
        this.router.navigate(['/login'])
    }

    // getAuthDetailFromToken(token) {
    //     return jwt_decode(token);
    // }

    signIn(credentials: Account) {
        return this.httpClient.post(`${baseUrl}/authenticate`, credentials).pipe(
            tap(({ token }: any) => {
                this.tokenSubject.next(token)

                this.cookieService.set(AUTH_TOKEN, token, 1800, '/') // Store JWT Token Into Cookie

                // const payload = this.getAuthDetailFromToken(token);

                //     this.cookieService.set(AUTH_DETAIL, JSON.stringify(payload), 1800, '/') // Store Auth Detail Into Cookie

                //     this.authDetailSubject.next(payload)
            })
        )
    }

    signOut() {

        this.tokenSubject.next(null)
        this.cookieService.delete(AUTH_TOKEN)

        this.goToSignInPage()
    }

    canActivate() {
        return this.token$.pipe(map(token => {
            const hasPermission = !!token;
            console.log(this.tokenFromCookie)
            console.log('token checked', token)

            if (hasPermission) {
                return true
            }

            this.goToSignInPage();

            return false;
        }))
    }
}
