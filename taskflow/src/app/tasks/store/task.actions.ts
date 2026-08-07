import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Load Tasks': props<{ term: string }>(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),

    'Create Task': props<{ task: Partial<Task> }>(),
    'Create Task Success': props<{ task: Task }>(),

    'Update Task': props<{ id: number; task: Partial<Task> }>(),
    'Update Task Success': props<{ task: Task }>(),
  }
});