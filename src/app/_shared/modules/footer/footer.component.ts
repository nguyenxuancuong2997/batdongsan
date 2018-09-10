import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  onInitJavascript() {
    setTimeout(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 700);
    }, 100);
  }


  

}
