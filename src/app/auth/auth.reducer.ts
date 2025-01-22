import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.action';
import { Usuario } from '../models/usuario.model';

export interface State {
  user: Usuario | null;
}

export const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(unSetUser, (state) => ({ ...state, user: null }))
);
