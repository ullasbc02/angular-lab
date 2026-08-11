import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { TaskForm } from './task-form';

describe('TaskForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, TaskForm]
    });
  });

  it('should be invalid when title is empty', () => {
    const fixture = TestBed.createComponent(TaskForm);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    component.taskForm.patchValue({
      title: '',
      status: 'todo',
      projectId: 1
    });

    expect(component.taskForm.invalid).toBe(true);
  });

  it('should be valid with a proper title', () => {
    const fixture = TestBed.createComponent(TaskForm);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    component.taskForm.patchValue({
      title: 'Valid title',
      status: 'todo',
      projectId: 1
    });

    expect(component.taskForm.valid).toBe(true);
  });
});
