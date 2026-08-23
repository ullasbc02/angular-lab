import { Component, Input, signal } from '@angular/core';
import { Header } from './header/header';
import { User } from "./user/user";
import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  imports: [Header, User],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  users = DUMMY_USERS;
  protected readonly title = signal('first-angular-app');
  
}

