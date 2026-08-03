import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Auth } from './auth';

const routes: Routes = [{ path: '', component: Auth }];

@NgModule({
  declarations: [Auth],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
