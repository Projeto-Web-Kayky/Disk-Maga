import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, ActivatedRoute } from '@angular/router';
import { publicRoutes } from './app.routes';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, TopBarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  shouldShowSidebar = signal(false);
  currentPageTitle = signal('');

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    document.body.classList.add('mat-app-background', 'dark-theme');

    // Verifica rota inicial
    this.updateSidebarVisibility(this.router.url);
    this.updatePageTitle();

    // Observa mudanças de rota
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateSidebarVisibility(event.urlAfterRedirects);
      this.updatePageTitle();
    });
  }

  private updateSidebarVisibility(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    const isPublicRoute = publicRoutes.some(route => cleanUrl.startsWith(route));
    this.shouldShowSidebar.set(!isPublicRoute);
    
    console.log('URL:', cleanUrl, '| Mostrar Sidebar:', !isPublicRoute);
  }

  private updatePageTitle(): void {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }
    
    const title = route?.snapshot.data['title'] || '';
    this.currentPageTitle.set(title);
    
    console.log('Título da página:', title);
  }
}