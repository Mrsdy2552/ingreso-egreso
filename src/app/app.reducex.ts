import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import  * as ingresoEgreso from './ingreso-egreso/ingresoEgreso.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  ingresEgresos: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  ingresEgresos: ingresoEgreso.ingresoEgresoReducer
};
