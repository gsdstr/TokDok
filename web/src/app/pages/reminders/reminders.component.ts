import { Component } from '@angular/core';
import {
  DxSchedulerModule
} from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import CustomStore from 'devextreme/data/custom_store';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  templateUrl: 'reminders.component.html',
  standalone: true,
  imports: [DxSchedulerModule, CommonModule],
})
export class RemindersComponent {
  dataSource: any;
  currentDate: Date = new Date();


  changes: any[] = [];
  updatedObject: any | null = null;
  editRowKey?: number | null = null;
  loadPanelPosition = { of: '#gridContainer' };
  isLoading = false;

  constructor(private readonly todoService: TodoService) {
    const component = this;
    this.dataSource = new CustomStore({
      key: 'id',
      async load(loadOptions: any): Promise<Todo[]> {
        const startDate = loadOptions.startDate;
        const endDate = loadOptions.endDate;
        return await firstValueFrom(todoService.getTodo(startDate, endDate));
      }
    });
  }

}
