import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) userId!: string;
  // @Input({ required: true }) title!: string;
  // @Input({ required: true }) summary!: string;
  // @Input({ required: true }) dueDate!: string;

  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTaskData>();
  
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    // Handle form submission logic here
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate,
    });
  }
}
