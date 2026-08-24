import { NewTaskData } from "./task/task.model";

import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class TasksService {
    private tasks = [
        {
            id: 't1',
            userId: 'u1',
            title: 'Master Angular',
            summary:
                'Learn all the basic and advanced features of Angular & how to apply them.',
            dueDate: '2025-12-31',
        },
        {
            id: 't2',
            userId: 'u3',
            title: 'Build first prototype',
            summary: 'Build a first prototype of the online shop website',
            dueDate: '2024-05-31',
        },
        {
            id: 't3',
            userId: 'u3',
            title: 'Prepare issue template',
            summary:
                'Prepare and describe an issue template which will help with project management',
            dueDate: '2024-06-15',
        },
    ];

    getUserTasks(userId: string) {
        return this.tasks.filter(task => task.userId === userId);
    }

    addTask(newTaskData: NewTaskData, userId: string) {
        const newTask = {
            id: `t${this.tasks.length + 1}`,
            userId: userId,
            title: newTaskData.title,
            summary: newTaskData.summary,
            dueDate: newTaskData.dueDate,
        };
        this.tasks.push(newTask);
    }

    removeTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}