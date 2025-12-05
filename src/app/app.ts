import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavBar } from '@components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('karto-ui');
}
