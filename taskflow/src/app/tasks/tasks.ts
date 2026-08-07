import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { TaskActions } from './store/task.actions';
import { selectAllTasks, selectTasksLoading, selectTasksError } from './store/task.selectors';
import { Task } from '../models/task.model';
import { TaskForm } from './task-form/task-form';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskForm],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class Tasks implements OnInit {
  searchControl = new FormControl('');
  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  showForm = false;
  editingTask: Task | null = null;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTasksLoading);
    this.error$ = this.store.select(selectTasksError);
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => this.store.dispatch(TaskActions.loadTasks({ term: term || '' })));
  }

  openCreateForm(): void { this.editingTask = null; this.showForm = true; }
  openEditForm(task: Task): void { this.editingTask = task; this.showForm = true; }
  onFormCancelled(): void { this.showForm = false; }

  onFormSaved(): void {
    this.showForm = false;
    this.store.dispatch(TaskActions.loadTasks({ term: this.searchControl.value || '' }));
  }

  trackById(index: number, task: Task): number { return task.id; }
}