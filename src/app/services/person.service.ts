import { Person } from './../models/person.model';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  personsCollection: AngularFirestoreCollection<Person>;
  persons: Observable<Person[]>;
  personDoc: AngularFirestoreDocument<Person>;
  constructor(public db: AngularFirestore) {
    this.personsCollection = this.db.collection('persons')
    // get a snapshot of a Firebase collection, retrieving not only its properties, but also metadata, like id of an element for instance
    this.persons = this.personsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map( a => {
            const data = a.payload.doc.data() as Person;
            data.id = a.payload.doc.id;
            return data;
        });
      }))
   }

   getPersons(){
     return this.persons;
   }

   filter(gender: string){
     if (gender == 'All') {
      this.persons = this.db.collection('persons').valueChanges()
     } else {
     this.persons = this.db.collection('persons', ref => ref.where('gender', '==', gender)).valueChanges()
    }
    return this.persons;
   }
   
   updatePerson(person: Person){
    this.personDoc = this.db.doc(`persons/${person.id}`)
    this.personDoc.update(person)
   }
}
