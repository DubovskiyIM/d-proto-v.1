import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  exit(): void {
    this.router.navigate(['/']);
  }

  next(route: string, queryParams?): void {
    let routerLink = route;
    if (typeof route === 'string' && !route.includes('/')) {
      routerLink = '/' + route;
    }
    this.router.navigate([routerLink], queryParams).then();
  }

  public goToProfilePage(ownerId: string) {
    let rouerLInk = `profile/${ownerId}`;
    this.router.navigate([rouerLInk]).then();
  }

  public goHomePage() {
    this.router.navigate(['lk/home']).then();
  }
}
