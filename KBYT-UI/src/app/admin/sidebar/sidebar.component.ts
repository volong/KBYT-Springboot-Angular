import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/service/auth.service';
import { ROUTEINFOS, RouterInfo } from '../routes';
import { BehaviorSubject } from 'rxjs'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const AUTH_TOKEN = 'AUTH_TOKEN'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {

  tokenSubject = new BehaviorSubject<string>(null);
  authDetailSubject = new BehaviorSubject<any>({});


  routerList: RouterInfo[] = ROUTEINFOS;

  constructor(private cookieService: CookieService, private router: Router,) { } // private authService: AuthService

  ngOnInit(): void {
  }

  signOut() {
    this.tokenSubject.next(null)
    this.cookieService.delete(AUTH_TOKEN)

    this.goToSignInPage()
  }

  goToSignInPage() {
    this.router.navigateByUrl('/login')
  }

  logout() {
    this.signOut();
  }

}
