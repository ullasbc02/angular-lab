import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  BehaviorSubject, Observable, catchError, finalize, of,
  debounceTime, distinctUntilChanged, switchMap, startWith
} from 'rxjs';
// import { catchError, finalize, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Task } from '../models/task.model';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
})
export class Tasks implements OnInit {
  searchControl = new FormControl('');
  tasks$!: Observable<Task[]>;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.tasks$ = this.searchControl.valueChanges.pipe(
      startWith(''),                          // fire once immediately on load, before any typing
      debounceTime(300),                      // wait 300ms of silence after each keystroke
      distinctUntilChanged(),                 // skip the call if the value didn't actually change
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
  
}

// switchMap — this is the one that actually matters most. If the user types "t", waits, gets results, then types "task" before the first request context is even relevant anymore, switchMap cancels the in-flight "t" request and switches to the new one. Without this — if you used mergeMap instead — both requests fire, and if the slower "t" response arrives after the "task" response, you'd briefly show stale results for the wrong search term. This exact scenario ("why switchMap and not mergeMap for search") is close to the single most common Angular interview question about RxJS. You now have a working answer with real code behind it