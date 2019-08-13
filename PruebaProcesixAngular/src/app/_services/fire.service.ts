import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private basePath = '/usuarios';
  public items: any;
  public item: any;
  constructor(private db: AngularFireDatabase) { }

  addUsuario(data) {
  const obj = this.db.database.ref(this.basePath);
  obj.push(data);
  console.log('Success');
  }

  


  getUsuarios(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }

}
