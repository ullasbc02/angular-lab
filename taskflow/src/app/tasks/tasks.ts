import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Task } from '../models/task.model';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
})
export class Tasks implements OnInit {
  tasks$!: Observable<Task[]>;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // console.log('Tasks component ngOnInit');
    this.tasks$ = this.api.getTasks().pipe(
      // tap(data => console.debug('API tasks response:', data)),
      catchError(err => {
        console.error('Tasks API error', err);
        this.errorMessage = 'Failed to load tasks. Is the API running?';
        return of([]); // fallback so the stream doesn't die
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  trackById(index: number, task: Task): number {
    return task.id;
  }
}
