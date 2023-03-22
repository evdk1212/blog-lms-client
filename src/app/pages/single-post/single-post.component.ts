import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'dk-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{
  singlePostData:any;
  similarPostAray:Post[]=[];
  commentsArray:Comment[]=[];
  postId:any;
  name:any;
  msg:any;
  postData: any;
  constructor(private route:ActivatedRoute,private postService:PostsService){}
  ngOnInit(): void {
      this.route.params.subscribe(val=>{
        this.postService.countViews(val['id']);
        this.loadComment(val['id']);
        this.postId=val['id'];
        this.postService.loadOnePost(val['id']).subscribe(post=>{
          this.singlePostData=post;
          this.loadSimilarPost(this.singlePostData.category.categoryId);
        });
      });
  }

  loadSimilarPost(catid:any){
    this.postService.loadSimilarPost(catid).subscribe(val=>{
      this.similarPostAray=val;
    });
  }

  
  loadComment(postId:any){
    this.postService.loadComments(postId).subscribe(val=>{
      this.commentsArray=val;
    });
  }

}
