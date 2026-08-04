import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Task } from '../models/task.model';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
})
export class Tasks implements OnInit {
  tasks$!: Observable<Task[]>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.tasks$ = this.api.getTasks();
  }
}
