import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { TaskActions } from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$;
  createTask$;
  updateTask$;

  constructor(private actions$: Actions, private api: ApiService) {
    this.loadTasks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.loadTasks),
        switchMap(({ term }) =>
          this.api.searchTasks(term).pipe(
            map(tasks => TaskActions.loadTasksSuccess({ tasks })),
            catchError(error => of(TaskActions.loadTasksFailure({ error: error.message })))
          )
        )
      )
    );

    this.createTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.createTask),
        switchMap(({ task }) =>
          this.api.createTask(task).pipe(
            map(created => TaskActions.createTaskSuccess({ task: created }))
          )
        )
      )
    );

    this.updateTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.updateTask),
        switchMap(({ id, task }) =>
          this.api.updateTask(id, task).pipe(
            map(updated => TaskActions.updateTaskSuccess({ task: updated }))
          )
        )
      )
    );
  }
}