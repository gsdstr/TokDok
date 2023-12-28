import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Todo } from "../../models/todo";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  editable = false;

  @Input() item!: Todo;
  @Output() remove = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();

  saveDescription(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.title = description;
    this.update.emit(this.item);
  }

  changeStatus() {
    this.item.isComplete = !this.item.isComplete;
    this.update.emit(this.item);
  }
}
