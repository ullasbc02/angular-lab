import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = {
      id: 't1',
      userId: 'u1',
      title: 'Test task',
      summary: 'Test summary',
      dueDate: '2025-12-31',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
