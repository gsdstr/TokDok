import { Component } from '@angular/core';
import { DxDataGridModule, DxFormModule, DxLoadPanelModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  templateUrl: 'tasks.component.html',
  standalone: true,
  imports: [DxDataGridModule, DxFormModule, CommonModule, DxLoadPanelModule]
})
export class TasksComponent {
  dataSource: any;
  priority: any[];

  changes: any[] = [];
  updatedObject: any | null = null;
  editRowKey?: number | null = null;
  loadPanelPosition = { of: '#gridContainer' };
  // allItemsSubscription: Subscription;
  // allItems: Observable<Todo[]>;
  isLoading = false;

  constructor(private readonly todoService: TodoService) {
    const component = this;
    this.dataSource = new CustomStore({
      key: "id",
      async load(loadOptions: any): Promise<Todo[]> {
        return await firstValueFrom(todoService.getAllTodo());
      },
      async insert(values: Todo): Promise<Todo> {
        return await firstValueFrom(todoService.createTodo(values));
      },
      async update(key: number, values: Todo): Promise<Todo> {
        const full = component.updatedObject;
        component.updatedObject = null;
        return await firstValueFrom(todoService.updateTodo(key, full));
      },
      remove(key: number) {
        return new Promise((resolve, reject) => {
              todoService.deleteTodo(key).subscribe((response: Object) => {
                  console.log(response, 'remove');
                  resolve();
                })
            });
      },
  });
  //allItems | async
  // this.allItems = this.todoService.getAllTodo();
  // this.isLoading = true;
  // this.allItemsSubscription = this.allItems.subscribe(() => {
  //     this.isLoading = false;
  // });


    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
  }

  ngOnInit(): void {
    //this.loadItems();
  }

  loadItems(){
    // this.allItems = undefined;
    // this.todoService.getAllTodo().subscribe((response: Todo[]) => {
    //   console.log(response, 'res');

    //   this.allItems = response;
    // })
  }

  onSaving(e: any) {
    const change = e.changes[0];

    // if(change) {
    //     e.cancel = true;
    //     e.promise = this.processSaving(change);
    // }
  }

  onRowUpdating(e: any){
    for (var property in e.oldData) {
      if (!e.newData.hasOwnProperty(property)) {
          e.newData[property] = e.oldData[property];
      }
    }
    this.updatedObject = e.newData;
    console.log(e, 'onRowUpdating');
  }
}
