import { Routes } from '@angular/router';
import { ProjectList } from './project-list/project-list';
import { ProjectDetail } from './project-detail/project-detail';
import { ProjectTasks } from './project-tasks/project-tasks';

export const PROJECTS_ROUTES: Routes = [
  { path: '', component: ProjectList },
  {
    path: ':id',
    component: ProjectDetail,
    children: [
      { path: 'tasks', component: ProjectTasks }
    ]
  }
];