import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent, TodoEditComponent, TodoAddComponent } from './components';
import { TodosService } from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    TodoListComponent,
    TodoEditComponent,
    TodoAddComponent
  ],
  exports: [
    TodoListComponent,
    TodoEditComponent,
    TodoAddComponent
  ],
  providers: [ TodosService ],
})
export class TodoModule { }
