import { Routes } from '@angular/router';
import { TaskScheduleComponent } from './task-schedule/task-schedule.component';
import { HomeScheduleComponent } from './home-schedule/home-schedule.component';

export const routes: Routes = [
    { path: '',   redirectTo: 'home-component', pathMatch: 'full' },
    {path: 'task-scheduler', component: TaskScheduleComponent},
    {path: 'home-component', component: HomeScheduleComponent},
];
