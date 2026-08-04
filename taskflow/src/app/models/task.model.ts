// src/app/models/task.model.ts
export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  projectId: number;
}