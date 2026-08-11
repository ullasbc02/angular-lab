import { describe, it, expect } from 'vitest';
import { taskReducer } from './task.reducer';
import { TaskActions } from './task.actions';

describe('taskReducer', () => {
  it('should set loading to true when tasks begin loading', () => {
    const initialState = { tasks: [], loading: false, error: null };

    const action = TaskActions.loadTasks({ term: '' });
    const nextState = taskReducer(initialState, action);

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should store tasks and clear loading on success', () => {
    const initialState = { tasks: [], loading: true, error: null };
    const tasks = [
      { id: 1, title: 'Write spec', status: 'todo' as const, projectId: 1 }
    ];

    const action = TaskActions.loadTasksSuccess({ tasks });
    const nextState = taskReducer(initialState, action);

    expect(nextState.tasks).toEqual(tasks);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should not mutate the original state object', () => {
    const initialState = { tasks: [], loading: false, error: null };

    const nextState = taskReducer(initialState, TaskActions.loadTasks({ term: '' }));

    expect(nextState).not.toBe(initialState);
    expect(initialState.loading).toBe(false);
  });
});
