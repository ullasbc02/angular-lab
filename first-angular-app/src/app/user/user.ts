import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import type { user } from './user.model';
import { Card } from "../shared/card/card";
const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);


@Component({
  selector: 'app-user',
  imports: [Card],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

  // @Input({required: true}) id!: string; 
  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;

  @Input({required: true}) user!: user;
  @Input({required: true}) selected!: boolean;
  @Output() userSelected = new EventEmitter<string>();
  
  
  selectedUser = DUMMY_USERS[randomIndex];



  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }
  
  onSelectUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // this.selectedUser = DUMMY_USERS[randomIndex];
    this.userSelected.emit(this.user.id);
  }
}
