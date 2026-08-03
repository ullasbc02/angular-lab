import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { App } from './app';

const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule) 
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
  { 
    path: 'tasks', 
    loadChildren: () => import('./tasks/tasks-module').then((m) => m.TasksModule) },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects-module').then((m) => m.ProjectsModule),
  },
];

@NgModule({
  declarations: [App],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  bootstrap: [App],
})
export class AppModule {}
