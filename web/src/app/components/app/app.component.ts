import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Todo } from "../../models/todo";
import { ItemComponent } from "../item/item.component";
import { TodoService } from './../../services/todo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ItemComponent]
})
export class AppComponent implements OnInit {
  title = "todo";

  filter: "all" | "active" | "done" = "all";

  allItems: null|Todo[] = null;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  get items() {
    if (!this.allItems) return null;
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.isComplete : !item.isComplete
    );
  }

  loadItems(){
    this.allItems = null;
    this.todoService.getAllTodo().subscribe((response: Todo[]) => {
      console.log(response, 'res');

      this.allItems = response;
    })
  }

  addItem(title: string) {
    if (!this.allItems) return;
    this.todoService.createTodo({title: title, isComplete: false}).subscribe(
      {
        error: (e: HttpErrorResponse) => console.error(e),
        complete: () => {
          console.info('addItem complete');
          this.loadItems();
          }
      }
    );
  }

  remove(item: Todo) {
    if (!this.allItems || !item.id) return;
    this.todoService.deleteTodo(item.id).subscribe(
      {
        error: (e: HttpErrorResponse) => console.error(e),
        complete: () => {
          console.info('remove complete');
          this.loadItems();
          }
      }
    );
  }

  update(item: Todo) {if (!this.allItems || !item.id) return;
    if (!this.allItems || !item.id) return;
    this.todoService.updateTodo(item.id, item).subscribe(
      {
        error: (e: HttpErrorResponse) => console.error(e),
        complete: () => {
          console.info('update complete');
          this.loadItems();
          }
      }
    );
  }

}
