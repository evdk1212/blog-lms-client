import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dk-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{
  constructor(){
    
  }
  @Input() commentData!:any;
  ngOnInit(): void {
      console.log(this.commentData);
  }
  
}
