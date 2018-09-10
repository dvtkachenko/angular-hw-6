import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { SumArrayPipe } from './pipes/sum-array.pipe';
import { ShowPipesDirectivesComponent } from './components/show-pipes-directives/show-pipes-directives.component';
import { MyNgStyleDirective } from './directives/my-ng-style.directive';
import { MyNgClassDirective } from './directives/my-ng-class.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    TodoEditComponent,
    TodoAddComponent,
    LoginComponent,
    RegisterComponent,
    CustomDatePipe,
    SumArrayPipe,
    ShowPipesDirectivesComponent,
    MyNgStyleDirective,
    MyNgClassDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
