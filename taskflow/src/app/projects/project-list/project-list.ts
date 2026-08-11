import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list.component.html'
})
export class ProjectList implements OnInit {
  projects$!: Observable<Project[]>;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.projects$ = this.api.getProjects(); }
  trackById(index: number, project: Project): number { return project.id; }
}