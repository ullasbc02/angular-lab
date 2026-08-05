import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss']
})

export class TaskForm implements OnChanges {
  @Input() task: Task | null = null;         // null = create mode, populated = edit mode
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  taskForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      status: ['todo', Validators.required],
      projectId: [null, Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task);   // pre-fill form when editing
    } else {
      this.taskForm.reset({ status: 'todo', title: '', projectId: null });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.taskForm.value;

    const request$ = this.task
      ? this.api.updateTask(this.task.id, formValue)
      : this.api.createTask(formValue);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.saved.emit();
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to save task.';
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
