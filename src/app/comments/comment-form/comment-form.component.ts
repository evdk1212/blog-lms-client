import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'dk-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  constructor(private postService:PostsService){}
  ngOnInit(): void {
      
  }
  @Input() postIdData:any;
  createComments(formData:any){
    let name = formData.value.name;
    let msg = formData.value.msg;
    this.postService.createComment(this.postIdData,name,msg,new Date().toDateString());
    formData.reset();
  }
}
