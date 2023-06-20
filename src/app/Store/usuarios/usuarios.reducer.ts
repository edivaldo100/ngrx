import { UsuarioModel } from "src/app/Models/UsuarioModel";
import { Action, createReducer, on } from "@ngrx/store"
import * as fromUsuariosAction from "../usuarios/usuarios.actions"
import { state } from "@angular/animations";
import { filter } from "rxjs";
import { createFeatureSelector, createSelector } from "@ngrx/store/src";




/**
 * Interface do modelo de estado dos usuarios
 */
export interface UsuariosState {
    usuarios: UsuarioModel[];
    usuario: UsuarioModel | null,
    error: string | ''
}

/**
 * Setar o valor inicial de cada propriedade acima
 */
export const initialState: UsuariosState = {
    usuarios: [],
    usuario: null,
    error: ''
}




const _usuariosReducer = createReducer(
    initialState,
    on(fromUsuariosAction.LoadUsuariosSucess, (state, { payload }) => ({ ...state, usuarios: payload, error: '' })),
    on(fromUsuariosAction.LoadUsuariosFail, (state, { error }) => ({ ...state, error: error })),

    on(fromUsuariosAction.LoadUsuarioSucess, (state, { payload }) => ({ ...state, usuario: payload, error: '' })),
    on(fromUsuariosAction.LoadUsuarioFail, (state, { error }) => ({ ...state, error: error })),

    /**
     * inclui o novo usuario criado na lista de ususrios 
     * [...state.usuarios, payload]
     */
    on(fromUsuariosAction.CreateUsuarioSucess, (state, { payload }) => ({ ...state, usuarios: [...state.usuarios, payload], error: '' })),
    
    /**
     * Se der algum erro na hora de criar um usuario não faz nada 
     * so mostra a msg de erro mesmo
     */
    on(fromUsuariosAction.CreateUsuarioFail, (state, { error }) => ({ ...state, error: error })),

    /**
     *  mapea o retorno para atualizar a lista de usuarios
     * 
     */
    on(fromUsuariosAction.UpdateUsuarioSucess, (state, { payload }) => ({ 
        ...state, 
        usuarios: [...state.usuarios].map((row)=>{
            if(row.id == payload.id){
                return payload;
            }else{
                return row;
            }
        }), 
        error: '' 
    })),
    
    /**
     * Se der algum erro na hora de atualiza um usuario não faz nada 
     * so mostra a msg de erro mesmo
     */
    on(fromUsuariosAction.UpdateUsuarioFail, (state, { error }) => ({ ...state, error: error })),

    /**
     * deleta um registro da lista 
     * eu atualizo a lista de usuarios menos o payload(id) enviado
     * filter((filter)=>filter.id != payload)
     * continua com todos menos o que for recebido
     */
    on(fromUsuariosAction.DeleteUsuarioSucess, (state, { payload }) => ({ 
        ...state, 
        usuarios: [...state.usuarios].filter((filter)=>filter.id != payload), 
        error: '' })),

    on(fromUsuariosAction.DeleteUsuarioFail, (state, { error }) => ({ ...state, error: error })),
)

/**
 * Função do reducer
 */
export function usuariosReducer(state = initialState, action: Action) {
    return _usuariosReducer(state, action);
}

// SELECTOR
//chave de acesso ao estado da app na memoria
const getUsuariosFeatureState = createFeatureSelector<UsuariosState>(
    'usuarios'
)

//busco a listagem mais atual de usuarios
export const getUsuarios = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios
)

//busco a listagem mais atual de usuarios
export const getUsuariosErro = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.error
)

//busco uma lista so de usuarios adm
export const getUsuariosAdm = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios.filter((filter)=> filter.perfil == 'adm')
)

//busco uma lista so de usuarios com idade maior q 50
export const getUsuariosMaiorQue50 = createSelector(
    getUsuariosFeatureState,
    (state: UsuariosState) => state.usuarios.filter((filter)=> filter.idade>= 50)
)