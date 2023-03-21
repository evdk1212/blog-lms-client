import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:AngularFirestore) { }
  loadData(): Observable<Category[]> {
    return this.afs.collection<Category>('categories').snapshotChanges().pipe(
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
