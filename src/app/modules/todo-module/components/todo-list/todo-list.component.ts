import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models';
import { TodosService } from '../../services';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor(private todosService: TodosService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.spinner.show();

    this.todosService.getTodos()
      .subscribe((response: Todo[]) => {
        this.todos = response;
        this.spinner.hide()
      }, error => {
        this.spinner.hide();
        this.toastr.error("Can not get todos from server", "Error", { timeOut: 3000 });
      }
      );
  }

  public onDelete(id: number): void {

    this.spinner.show();

    this.todosService.deleteTodo(id)
      .subscribe((response: Object) => {
        this.todos = this.todos.filter(filteredTodoses => filteredTodoses.id != id);
        this.spinner.hide();
        this.toastr.success("Todo was successfully deleted", "Info", { timeOut: 3000 });
      }, error => {
        this.spinner.hide();
        this.toastr.error("Todo was not deleted", "Error", { timeOut: 3000 });
      }
        // in an error case it does not work
        // () => this.spinner.hide()    
      );
  }

}
