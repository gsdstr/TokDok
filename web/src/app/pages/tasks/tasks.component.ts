import { Component } from '@angular/core';
import { DxDataGridModule, DxFormModule, DxLoadPanelModule, DxTagBoxModule
    } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import CustomStore from 'devextreme/data/custom_store';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag';
import { CustomItemCreatingEvent } from 'devextreme/ui/tag_box';

@Component({
  templateUrl: 'tasks.component.html',
  standalone: true,
  imports: [DxDataGridModule, DxFormModule, CommonModule, DxLoadPanelModule, DxTagBoxModule]
})
export class TasksComponent {

  dataSource: any;
  priority: any[];

  tags: string[] = [];
  changes: any[] = [];
  updatedObject: any | null = null;
  editRowKey?: number | null = null;
  loadPanelPosition = { of: '#gridContainer' };
  // allItemsSubscription: Subscription;
  // allItems: Observable<Todo[]>;
  isLoading = false;

  constructor(private readonly todoService: TodoService, private readonly tagService: TagService) {
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
    this.loadItems();
  }

  loadItems(){
    this.tags = [];
    const component = this;
    this.tagService.getAllTag().subscribe((response: Tag[]) => {
      component.tags = response.map(t => t.title);
    })
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

  calculateFilterExpression(filterValue: any, selectedFilterOperation: any, target: any) {
    if (target === 'search' && typeof (filterValue) === 'string') {
      return [(this as any).dataField, 'contains', filterValue];
    }
    return function (rowData: any) {
      return (rowData.AssignedEmployee || []).indexOf(filterValue) !== -1;
    };
  }

  cellTemplate(container: any, options: any) {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }

  onCustomItemCreating(args: CustomItemCreatingEvent) {
    const newValue = args.text;
    if (!newValue) return;
    const isItemInDataSource = this.tags.some((item) => item === newValue);
    if (!isItemInDataSource) {
      this.tags.unshift(newValue);
    }
    args.customItem = newValue;
  }

}
