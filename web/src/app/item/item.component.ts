import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "./../models/todo";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  editable = false;

  @Input() item!: Todo;
  @Output() remove = new EventEmitter<Todo>();

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.title = description;
  }
}
