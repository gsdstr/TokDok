import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Todo } from "./models/todo";
import { ItemComponent } from "./item/item.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ItemComponent]
})
export class AppComponent {
  title = "todo";

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { title: "eat", isComplete: true },
    { title: "sleep", isComplete: false },
    { title: "play", isComplete: false },
    { title: "laugh", isComplete: false },
  ];

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.isComplete : !item.isComplete
    );
  }

  addItem(title: string) {
    this.allItems.unshift({
      title,
      isComplete: false
    });
  }

  remove(item: Todo) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

}
