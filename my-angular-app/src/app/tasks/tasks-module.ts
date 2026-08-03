import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Tasks } from './tasks';

const routes: Routes = [{ path: '', component: Tasks }];

@NgModule({
  declarations: [Tasks],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TasksModule {}
