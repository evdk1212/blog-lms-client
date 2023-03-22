import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'dk-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit{
  navbarOpen = false;
  categoryArray: Category[] = [
    
    // other objects...
  ];
  constructor(private categoryService:CategoriesService){

  }
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val=>{
      this.categoryArray = val;

    });
  }
  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
