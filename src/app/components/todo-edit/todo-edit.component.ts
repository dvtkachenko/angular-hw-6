import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'node_modules/ngx-toastr';
import { NgxSpinnerService } from 'node_modules/ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  public todoEditForm: FormGroup;

  todoId: string;
  todo: Todo;
  isReadOnly: boolean = true;

  constructor(private fb: FormBuilder, 
    private todosService: TodosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.todoEditForm = this.createTodoEditForm();
    this.todoEditForm.get("completed").disable();

    this.spinner.show();

    this.todoId = this.activatedRoute.snapshot.params['id'];
    this.todosService.getTodo(this.todoId)
      .subscribe((response: Todo) => {
        this.todo = response;
        this.spinner.hide();
        this.initTodoEditForm(this.todo);
      }, error => {
        this.toastr.error("Can not get todo from server", "Error", { timeOut: 3000 });
        this.router.navigate(['/']);
        this.spinner.hide();
      }
      );
  }

  public onEdit(): void {
    this.isReadOnly = false;
    this.todoEditForm.get("completed").enable();
  }

  public onSave(): void {
    
    if (this.todoEditForm.invalid) {
      return;
    }

    this.isReadOnly = true;
    this.todoEditForm.get("completed").disable();
    this.spinner.show();

    this.todo.userId = this.todoEditForm.value.userId;
    this.todo.title = this.todoEditForm.value.title;
    this.todo.completed = this.todoEditForm.value.completed;

    const clonedTodo = Object.assign({}, this.todo);

    this.todosService.updateTodo(clonedTodo)
      .subscribe((response: Todo) => {
        this.todo = response;
        this.spinner.hide();
        this.toastr.success("Todo was successfully updated", "Info", { timeOut: 3000 });
        this.router.navigate(['/']);
      }, error => {
        this.spinner.hide();
        this.toastr.error("Can not update todo on server", "Error", { timeOut: 3000 });
      }
        // in an error case it does not work
        // () => {
        //   this.router.navigate(['/']);
        //   this.spinner.hide();
        // }
      );
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }
   
  private createTodoEditForm(): FormGroup {
    return this.fb.group({
      userId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      completed: ['']
    });
  } 
   
  private initTodoEditForm(todo: Todo): void {
    this.todoEditForm.get("userId").setValue(todo.userId);
    this.todoEditForm.get("title").setValue(todo.title);
    this.todoEditForm.get("completed").setValue(todo.completed);
  } 

}
