import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-task',
  imports: [],
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
  

  onCancel() {
    this.cancel.emit();
  }

}
