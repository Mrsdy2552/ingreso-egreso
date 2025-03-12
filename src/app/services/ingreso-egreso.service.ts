import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  addDoc,
  collectionData,
  collectionSnapshots,
  deleteDoc,
} from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<void> {
    return new Promise((resolve, reject) => {
      const uid = this.authService.user?.uid;

      if (!uid) {
        reject('Error: Usuario no autenticado.');
        return;
      }

      delete ingresoEgreso.id;

      const userDocRef = doc(this.firestore, `${uid}/ingreso-egreso`);
      const itemsCollectionRef = collection(userDocRef, 'items');

      ingresoEgreso = { ...ingresoEgreso, uid };

      addDoc(itemsCollectionRef, { ...ingresoEgreso })
        .then(() => resolve()) // Resuelve la promesa si el documento se agrega correctamente
        .catch((error) => reject(error)); // Rechaza la promesa si hay un error
    });
  }

  initIngresoEgresosListener(uid: string): Observable<IngresoEgreso[]> {
    const itemsCollectionRef = collection(
      this.firestore,
      `${uid}/ingreso-egreso/items`
    );

    return collectionSnapshots(itemsCollectionRef).pipe(
      map((snapshot) =>
        snapshot.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as unknown as IngresoEgreso;
        })
      )
    );
  }

  borrarIngreso(idItem: string) {
    const uid = this.authService.user?.uid;
    const itemDocRef = doc(
      this.firestore,
      `${uid}/ingreso-egreso/items/${idItem}`
    );

    return deleteDoc(itemDocRef);
  }
}
