import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private title: Title,
    private mt: Meta
  ) { }

  ngOnInit() {
    this.title.setTitle('luanaaina Spa');    
  }

}
