import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ShowPipesDirectivesComponent } from './components/show-pipes-directives/show-pipes-directives.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'show-pipes-directives', component: ShowPipesDirectivesComponent, canActivate: [ AuthGuard ] },
  { path: 'about', component: AboutComponent, canActivate: [ AuthGuard ] },
  { path: 'todo', component: TodoAddComponent, canActivate: [ AuthGuard ] },
  { path: 'todo/:id', component: TodoEditComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: NotFoundComponent, canActivate: [ AuthGuard ] }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
