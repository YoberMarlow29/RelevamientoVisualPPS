import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat/app'; // Importa firebase para usar FieldValue


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private cosasLindasColeccion: any;
  cosasLindas: Observable<any>;
  cosasLindasArray: any = [];

  private cosasFeasColeccion: any;
  cosasFeas: Observable<any>;
  cosasFeasArray: any = [];

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {
    this.cosasLindasColeccion = this.angularFirestore.collection<any>('cosasLindas', ref => ref.orderBy('hora', 'desc'));
    this.cosasLindas = this.cosasLindasColeccion.valueChanges({ idField: 'id' });

    this.obtenerCosasLindas().subscribe((value) => {
      this.cosasLindasArray = value;
    });



    this.cosasFeasColeccion = this.angularFirestore.collection<any>('cosasFeas', ref => ref.orderBy('hora', 'desc'));
    this.cosasFeas = this.cosasFeasColeccion.valueChanges({ idField: 'id' });

    this.obtenerCosasFeas().subscribe((value) => {
      this.cosasFeasArray = value;
    });
  }

  subirImagen(rutaArchivo: string, datosArchivo: any) {
    return this.angularFireStorage.upload(rutaArchivo, datosArchivo);
  }
  agregarFoto(foto: any, type:number) {

    if (type == 1) {
      this.cosasLindasColeccion.add({ ...foto });
    } else if (type == 2) {
      this.cosasFeasColeccion.add({ ...foto });
    }
  }

  actualizarFotosLindas(foto: any, id: any,type:number) {

    if (type == 1) {
      return this.cosasLindasColeccion.doc(id).update(foto);
    } else if (type == 2) {
      return this.cosasFeasColeccion.doc(id).update(foto);
    }

  }

  agregarVoto(photoId: string, userId: string, collection : any) {
    const votoRef = this.angularFirestore.collection(collection).doc(photoId);
    return votoRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(userId)
    });
  }

  quitarVoto(photoId: string, userId: string,collection : any) {
    const votoRef = this.angularFirestore.collection(collection).doc(photoId);
    return votoRef.update({
      likes: firebase.firestore.FieldValue.arrayRemove(userId)
    });
  }


  obtenerReferenciaArchivo(rutaArchivo: string) {
    return this.angularFireStorage.ref(rutaArchivo);
  }

  obtenerCosasLindas() {
    return this.cosasLindas;
  }
  obtenerCosasFeas() {
    return this.cosasFeas;
  }

  obtenerUsuarioPorEmail(email: string): Observable<any> {
    return this.angularFirestore.collection('users', ref => ref.where('email', '==', email)).snapshotChanges().pipe(
      map(actions => {
        const users = actions.map(a => {
          const data = a.payload.doc.data() as { [key: string]: any };
          const id = a.payload.doc.id;
          return { id, ...data };
        });
        return users.length > 0 ? users[0] : null;
      })
    );
  }
}
