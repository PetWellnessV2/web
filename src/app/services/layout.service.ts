import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private showLayoutSubject = new BehaviorSubject<boolean>(true);
  showLayout$ = this.showLayoutSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => {
        this.showLayoutSubject.next(!this.isLoginPage(event.urlAfterRedirects));
      })
    ).subscribe();
  }

  private isLoginPage(url: string): boolean {
    return url === '/login' || url === '/signin' || url.startsWith('/recovery');
  }

}