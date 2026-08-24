import { Injectable } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import type { user } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly users: user[] = DUMMY_USERS;

  getUsers(): user[] {
    return this.users;
  }

  getUserById(id: string): user | undefined {
    return this.users.find(user => user.id === id);
  }
}
