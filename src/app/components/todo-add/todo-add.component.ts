import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'node_modules/ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  public todoAddForm: FormGroup;

  todo: Todo;

  constructor(private fb: FormBuilder,
    private todosService: TodosService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.todo = {
      userId: 1,
      title: '',
      completed: false
    }
    this.todoAddForm = this.createTodoAddForm(this.todo);
  }

  public onAdd(): void {

    this.spinner.show();

    if (this.todoAddForm.invalid) {
      return;
    }

    this.todo.userId = this.todoAddForm.value.userId;
    this.todo.title = this.todoAddForm.value.title;
    this.todo.completed = this.todoAddForm.value.completed;

    const clonedTodo = Object.assign({}, this.todo);

    this.todosService.createTodo(clonedTodo)
      .subscribe((response: Todo) => {
        this.spinner.hide();
        this.toastr.success("Todo was successfully created", "Info", { timeOut: 3000 });
        this.router.navigate(['/']);
      }, error => {
        this.spinner.hide();
        this.toastr.error("Can not create todo on server", "Error", { timeOut: 3000 });
      });
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }
 
  private createTodoAddForm(todo: Todo): FormGroup {
    return this.fb.group({
      userId: [todo.userId, [Validators.required]],
      title: [todo.title, [Validators.required]],
      completed: [todo.completed]
    });
  } 
}
