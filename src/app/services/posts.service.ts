import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';
import * as firebase from '@angular/fire/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs:AngularFirestore) { }

  loadFeaturedData(): Observable<Post[]> {
    return this.afs.collection<Post>('posts', ref=>ref.where('isFeatured','==',true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  loadLatestData(): Observable<Post[]> {
    return this.afs.collection<Post>('posts', ref=>ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  loadCategoryPosts(categoryId:any){
    return this.afs.collection<Post>('posts', ref=>ref.where('category.categoryId','==',categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  loadOnePost(id:any){
    return this.afs.collection('posts').doc(id).valueChanges();
  }
  loadSimilarPost(catid:any){
    return this.afs.collection<Post>('posts', ref=>ref.where('category.categoryId','==',catid).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  countViews(postId:any){
    const viewscount ={
      views:firebase.increment(1),
    };
    this.afs.collection('posts').doc(postId).update(viewscount).then(()=>{
      
    });
  }
  createComment(postId:any,name:any,msg:any,date:any){
    this.afs.collection('posts').doc(postId).collection('comments').add({
      'name':name,
      'msg': msg,
      'createdDate':date,
    }).then(()=>{

    });

  }
  loadComments(postID:any): Observable<Comment[]> {
    return this.afs.collection<Post>('posts').doc(postID).collection<Comment>('comments').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
}
}
