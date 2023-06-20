import { ActionReducerMap } from "@ngrx/store";
import { UsuariosEffects } from "./usuarios/usuarios.effects";
import { usuariosReducer, UsuariosState } from "./usuarios/usuarios.reducer";




export interface AppState{
    /**
     * cheve de acesso a um monto especifico do estado da app.
     * vem da do usuarios.reducer.ts
     * AQUI ---> const getUsuariosFeatureState = createFeatureSelector<UsuariosState>(
     *'usuarios'
     *)
     */
    usuarios: UsuariosState

    /**
     * se tiver mais de um estado da app  a monitor aqui no appState quem seria inserido
     * tipo : produtos: ProdutosState
     */
}

export const appReducer: ActionReducerMap<AppState> = {
    usuarios: usuariosReducer
}

export const appEffects = [
    UsuariosEffects
]