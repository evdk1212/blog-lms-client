import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'dk-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{
  categoryPostArray: Post[]=[];
  categoryName: any;
  constructor(private route:ActivatedRoute,private postService:PostsService){}
  ngOnInit(): void {
      this.route.params.subscribe(val=>{
        this.categoryName=val;
        this.postService.loadCategoryPosts(val['id']).subscribe(post=>{
          this.categoryPostArray=post;
        });
      });
  }

}
