import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAllTasks } from '../tasks/store/task.selectors';
@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  private store = inject(Store);
  tasks$ = this.store.select(selectAllTasks);

  todoCount$ = this.tasks$.pipe(map(tasks => tasks.filter(t => t.status === 'todo').length));
  inProgressCount$ = this.tasks$.pipe(map(tasks => tasks.filter(t => t.status === 'in-progress').length));
  doneCount$ = this.tasks$.pipe(map(tasks => tasks.filter(t => t.status === 'done').length));
}
