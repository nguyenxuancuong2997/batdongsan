import { PlatformLocation } from '@angular/common';
import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PagingModel } from '../../models/pagingModel';
import { ExtensionService } from '../../services/extension.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
  providers: [ExtensionService]
})
export class PagingComponent implements OnInit, OnChanges {  
  @Input() data: PagingModel;
  @Input() view: number = 5;
  @Input() loading: boolean;
  @Output() onBackBrowse = new EventEmitter<number>();
  @Output() onChange = new EventEmitter<number>();

  lstPage: number[] = [];
  curentPage: number = 1;
  totalPage: number = 0;
  totalItem: number = 0;

  constructor(private location : PlatformLocation, private ex: ExtensionService){}

  ngOnInit(): void {
    //fix back browse load data page
    this.location.onPopState(() => {
      let page = this.ex.getUrlParameter('page');
      if(page != null)
      {
         this.onBackBrowse.emit(page);
      }     
    });
  }

  ngOnChanges() {
    this.lstPage = [];
    if(this.data == null){return}
    if (this.data.totalPage > 1) {
      let showItem = this.view;
      if (this.data.totalPage < this.view) { showItem = this.data.totalPage }
      this.curentPage = this.data.page;
      this.totalPage = this.data.totalPage;
      this.totalItem = this.data.count;

      //index slot curent page
      let index = this.curentPage;
      if(showItem == this.view){
         index = showItem % 2 == 0 ? (showItem / 2) : parseInt((showItem / 2).toString()) + 1
      }

      let fix = this.curentPage < index ? (index - this.curentPage) : 0;  
      if(this.curentPage > (this.totalPage - index) && showItem == this.view){ fix= (this.totalPage - index) - this.curentPage + 1} 
      for (let i = 1; i <= showItem; i++) {
        this.lstPage.push(this.curentPage - index + i + fix);
      }
    }
  }

  onChangePage(page: number) {
    if(page< 1){return}
    if(page>this.totalPage){return}  
    this.onChange.emit(page);
  }
}