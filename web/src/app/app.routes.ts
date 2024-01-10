import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { HomeComponent } from './pages/home/home.component';
import { TagsComponent } from './pages/tags/tags.component';
import { RemindersComponent } from './pages/reminders/reminders.component';

export const routes: Routes = [
  {
    path: 'notes',
    component: TasksComponent
  },
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'reminders',
    component: RemindersComponent
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];
