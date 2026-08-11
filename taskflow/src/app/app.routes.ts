import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Layout } from './layout/layout';
import { Tasks } from './tasks/tasks';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'tasks', component: Tasks },
      {
        path: 'projects',
        loadComponent: () => import('./projects/projects').then((m) => m.Projects),
        children: [
          { path: '', loadComponent: () => import('./projects/project-list/project-list').then((m) => m.ProjectList) },
          {
            path: ':id',
            loadComponent: () => import('./projects/project-detail/project-detail').then((m) => m.ProjectDetail),
            children: [
              {
                path: 'tasks',
                loadComponent: () => import('./projects/project-tasks/project-tasks').then((m) => m.ProjectTasks)
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }