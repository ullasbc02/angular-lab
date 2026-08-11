import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-tasks.html'
})
export class ProjectTasks implements OnInit {
  tasks$!: Observable<Task[]>;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.tasks$ = this.route.parent!.paramMap.pipe(
      switchMap(params => this.api.getTasksByProject(Number(params.get('id'))))
    );
  }
}