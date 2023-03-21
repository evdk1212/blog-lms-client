import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'dk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredPostArray: Post[] = [
    
    // other objects...
  ];
  latestPostArray:Post[]=[];
  constructor(private postService:PostsService){
   
  }
  ngOnInit(): void {
    this.postService.loadFeaturedData().subscribe(val=>{
      this.featuredPostArray=val;
    });
    this.postService.loadLatestData().subscribe(val=>{
      this.latestPostArray=val;
    });
    
  }
}
