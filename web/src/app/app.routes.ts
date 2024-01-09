import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
