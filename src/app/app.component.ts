import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'CoreUI Free Angular Admin Template';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    public authService: AuthService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    this.authService.loadToken();
    this.authService.decodeJWT();

    this.authService.isloggedIn = this.authService.token != null;

    if (typeof localStorage !== 'undefined') {
      this.authService.loggedUser = localStorage.getItem('loggedUser') || '';
      this.authService.roles = localStorage.getItem('roles')?.split(',') || [];
    }
    this.authService.loadToken();

    if (!this.authService.isloggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
