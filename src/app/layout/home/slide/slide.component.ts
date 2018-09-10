import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  initSlide() {
    setTimeout(() => {
      $('.carousel-inner').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dom: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1
          },
        }
      })
    }, 100);
  }

}


