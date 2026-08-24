import { Component, Input, signal } from '@angular/core';
import { Header } from './header/header';
import { User } from "./user/user";
import { DUMMY_USERS } from './dummy-users';
import { Tasks } from "./tasks/tasks";

@Component({
  selector: 'app-root',
  imports: [Header, User, Tasks],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  

  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId)!;
  }

  onSelectUser($event: string) {
    console.log('User selected with ID:', $event);
    this.selectedUserId = $event;
  }
  protected readonly title = signal('first-angular-app');
  
}

