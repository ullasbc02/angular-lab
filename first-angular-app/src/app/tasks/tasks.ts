import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task";
import { NewTask } from "./new-task/new-task";
import { NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';
@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  constructor(private tasksService: TasksService) {}
  selected = false;

  

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onCompleteTask(id: string) {
    this.tasksService.removeTask(id);
  }

  onStartAddTask() {
    this.selected = true;
  }

  onCancelAddTask() {
    this.selected = false;
  }

  onAddTask(newTaskData: NewTaskData) {
    this.tasksService.addTask(newTaskData, this.userId);
    this.selected = false;
  }
}
