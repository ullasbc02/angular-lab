import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject, merge } from 'rxjs';
import { catchError, finalize, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Task } from '../models/task.model';
import { TaskForm } from './task-form/task-form';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule, ReactiveFormsModule, TaskForm],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
})
export class Tasks implements OnInit {
  searchControl = new FormControl('');
  tasks$!: Observable<Task[]>;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  errorMessage = '';
  private refreshTrigger = new Subject<void>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const search$ = merge(
      this.searchControl.valueChanges.pipe(startWith('')),
      this.refreshTrigger.pipe(switchMap(() => of(this.searchControl.value || '')))
    );

    this.tasks$ = search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.loadingSubject.next(true);
        return this.api.searchTasks(term || '').pipe(
          catchError(() => {
            this.errorMessage = 'Failed to load tasks.';
            return of([]);
          }),
          finalize(() => this.loadingSubject.next(false))
        );
      })
    );
  }

  trackById(index: number, task: Task): number {
    return task.id;
  }
  
  showForm = false;
  editingTask: Task | null = null;

  openCreateForm(): void {
    this.editingTask = null;
    this.showForm = true;
  }

  openEditForm(task: Task): void {
    this.editingTask = task;
    this.showForm = true;
  }

  onFormSaved(): void {
    this.showForm = false;
    this.refreshTasks();   // see note below
  }

  onFormCancelled(): void {
    this.showForm = false;
  }
  
  refreshTasks(): void {
    this.refreshTrigger.next();
  }
}

// switchMap — this is the one that actually matters most. If the user types "t", waits, gets results, then types "task" before the first request context is even relevant anymore, switchMap cancels the in-flight "t" request and switches to the new one. Without this — if you used mergeMap instead — both requests fire, and if the slower "t" response arrives after the "task" response, you'd briefly show stale results for the wrong search term. This exact scenario ("why switchMap and not mergeMap for search") is close to the single most common Angular interview question about RxJS. You now have a working answer with real code behind it