import { Component, signal } from '@angular/core';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('first-angular-app');
}

