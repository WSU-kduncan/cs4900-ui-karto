import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-nav-bar',
  imports: [Menubar],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit {
  private readonly localStorage = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  items = signal<MenuItem[]>([]);
  loginSubscription = this.localStorage.onLogin
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => this.updateItems());

  logout() {
    this.localStorage.logout();
    this.router.navigate(['']);
  }

  updateItems() {
    if (this.localStorage.accessToken)
      this.items.set([
        {
          label: 'Cars',
          icon: 'pi pi-fw pi-car',
          routerLink: ['/cars'],
        },
        {
          label: 'Gas Prices',
          icon: 'pi pi-fw pi-dollar',
          routerLink: ['/prices'],
        },
        {
          label: 'Gas Stations',
          icon: 'pi pi-fw pi-map-marker',
          routerLink: ['/gas-stations'],
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => this.logout(),
        },
      ]);
    else
      this.items.set([
        {
          label: 'Create Account',
          icon: 'pi pi-fw pi-user-plus',
          routerLink: ['/create-account'],
        },
        {
          label: 'Login',
          icon: 'pi pi-fw pi-sign-in',
          routerLink: ['/login'],
        },
      ]);
  }

  ngOnInit() {
    this.updateItems();
  }
}
