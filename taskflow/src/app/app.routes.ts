import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
import { Layout } from './layout/layout';
import { Tasks } from './tasks/tasks';
import { Projects } from './projects/projects';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],       // guard once, protects everything nested inside
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'tasks', component: Tasks },
      { path: 'projects', component: Projects },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }