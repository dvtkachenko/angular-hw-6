import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public currentDate: number;

  public array: number[];

  constructor() { }

  ngOnInit() {
    this.currentDate = new Date().getTime();
    this.array = [3, 5, 10, 1, 4];
  }

}
