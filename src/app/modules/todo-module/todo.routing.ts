import { Routes } from '@angular/router';
import { TodoListComponent, TodoAddComponent, TodoEditComponent } from './components';

export const todoRoutes: Routes = [
    { path: '', component: TodoListComponent },
    { path: 'todo', component: TodoAddComponent },
    { path: 'todo/:id', component: TodoEditComponent }
]; 