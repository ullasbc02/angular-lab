import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Projects } from './projects';

const routes: Routes = [{ path: '', component: Projects }];

@NgModule({
  declarations: [Projects],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProjectsModule {}
