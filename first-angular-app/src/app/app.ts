import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { User } from "./user/user";
import { UserService } from './user/user.service';
import { Tasks } from "./tasks/tasks";

@Component({
  selector: 'app-root',
  imports: [Header, User, Tasks],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  selectedUserId?: string;

  get users() {
    return this.userService.getUsers();
  }

  get selectedUser() {
    return this.selectedUserId
      ? this.userService.getUserById(this.selectedUserId)
      : undefined;
  }

  constructor(private userService: UserService) {}

  onSelectUser($event: string) {
    console.log('User selected with ID:', $event);
    this.selectedUserId = $event;
  }
  protected readonly title = signal('first-angular-app');
  
}

