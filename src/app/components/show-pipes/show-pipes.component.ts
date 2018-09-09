import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-pipes',
  templateUrl: './show-pipes.component.html',
  styleUrls: ['./show-pipes.component.css']
})
export class ShowPipesComponent implements OnInit {

  public currentDate: number;

  public numArray: number[] = [];

  constructor() { }

  ngOnInit() {
    this.currentDate = new Date().getTime();
    this.numArray = [3, 5, 10];
  }

  public addNewElement(): void {
    this.numArray.push(Math.floor(Math.random() * 20));
  }
}
