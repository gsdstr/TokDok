import { Component } from '@angular/core';
import {
  DxSchedulerModule
} from 'devextreme-angular';
import 'devextreme/data/odata/store';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import CustomStore from 'devextreme/data/custom_store';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag';

@Component({
  templateUrl: 'reminders.component.html',
  standalone: true,
  imports: [DxSchedulerModule, CommonModule],
})
export class RemindersComponent {
  dataSource: any;

  changes: any[] = [];
  updatedObject: any | null = null;
  editRowKey?: number | null = null;
  loadPanelPosition = { of: '#gridContainer' };
  isLoading = false;

  constructor(private readonly tagService: TagService) {
    const component = this;
    this.dataSource = new CustomStore({
      key: 'id',
      async load(loadOptions: any): Promise<Tag[]> {
        return await firstValueFrom(tagService.getAllTag());
      },
      async insert(values: Tag): Promise<Tag> {
        return await firstValueFrom(tagService.createTag(values));
      },
      async update(key: number, values: Tag): Promise<Tag> {
        const full = component.updatedObject;
        component.updatedObject = null;
        return await firstValueFrom(tagService.updateTag(key, full));
      },
      remove(key: number) {
        return new Promise((resolve, reject) => {
          tagService.deleteTag(key).subscribe((response: Object) => {
            console.log(response, 'remove');
            resolve();
          });
        });
      },
    });
  }

  onSaving(e: any) {
    const change = e.changes[0];

    // if(change) {
    //     e.cancel = true;
    //     e.promise = this.processSaving(change);
    // }
  }

  onRowUpdating(e: any) {
    for (var property in e.oldData) {
      if (!e.newData.hasOwnProperty(property)) {
        e.newData[property] = e.oldData[property];
      }
    }
    this.updatedObject = e.newData;
    console.log(e, 'onRowUpdating');
  }

}
