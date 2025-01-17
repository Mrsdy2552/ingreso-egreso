import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  initAuthListener(): Observable<any> {
    return authState(this.auth);
  }

  crearUsuario(nombre: string, email: string, password: string) {
    console.log({ nombre, email, password });

    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser = new Usuario(user.uid, nombre, email);
        const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);

        return setDoc(userDocRef, { ...newUser });
      }
    );
  }

  loginUsuario(email: string, password: string) {
    console.log({ email, password });
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout() {
    return this.auth.signOut();
  }
}
