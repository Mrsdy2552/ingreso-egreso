import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducex';
import * as authAction from '../auth/auth.action';
import * as ingresoEgresoAction from '../ingreso-egreso/ingresoEgreso.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authSubscription: any;
  firestoreSubscription: any;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  private userSubject = new BehaviorSubject<Usuario | null>(null);
  public user$: Observable<Usuario | null> = this.userSubject.asObservable();
  private _user: Usuario | null = null;

  get user() {
    return { ...this._user };
  }

  initAuthListener(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    this.authSubscription = authState(this.auth).subscribe((fuser) => {
      if (fuser) {
        const userDocRef = doc(this.firestore, `usuarios/${fuser.uid}`);

        if (this.firestoreSubscription) {
          this.firestoreSubscription.unsubscribe();
        }

        this.firestoreSubscription = docData(userDocRef).subscribe(
          (firestoreUser: any) => {
            if (firestoreUser) {
              const user = Usuario.fromFirebase(firestoreUser);
              this._user = user;
              this.userSubject.next(user); // Actualiza el BehaviorSubject
              
              this.store.dispatch(authAction.setUser({ user })); 
            }
          },
          (error) => console.error('Error al obtener datos del usuario:', error)
        );
      } else {
        this._user = null;
        this.userSubject.next(null); // Usuario no autenticado
        this.store.dispatch(authAction.unSetUser());
        this.store.dispatch(ingresoEgresoAction.unSetItems());
        if (this.firestoreSubscription) {
          this.firestoreSubscription.unsubscribe();
        }
      }
    });
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
