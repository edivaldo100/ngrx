import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { UsuariosService } from "src/app/Repository/UsuariosService";

import * as fromUsuariosAction from "./usuarios.actions";

@Injectable()
export class UsuariosEffects {
    /**
     * injection de uma ação e um serviço
     * 
     * @param actions$ 
     * @param usuariosService 
     */
    constructor(private actions$: Actions, private usuariosService: UsuariosService) { }

    /**
     * os effects recebem 1 ação tipo ir ao backend e voltar
     *  e tem 2 ações possiveis 1-um sucesso, 2-um erro (tipo se a api estiver fora do ar)
     */
    loadUsuarios$ = createEffect(
        () =>
            this.actions$.pipe( //captura a ação que esta sendo executada
                ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIOS),//tipo de ação e seu tipo de retorno - action que ira ser acapturada
                exhaustMap(() => this.usuariosService.getUsuarios()//acesso ao service -. quero q me retorne a lista de users
                    /**
                     * ao ir no service o retorno pode ser sucesso ou erro 
                     * aqui é mapeado estes 2 retornos
                     */
                    .pipe(
                        map(payload =>
                            fromUsuariosAction.LoadUsuariosSucess({ payload }),//retorno sucesso com os dados
                            catchError(error => of(fromUsuariosAction.LoadUsuariosFail({ error }))))//erro
                    ))
            )
    )

    loadUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.LOAD_USUARIO),
                exhaustMap((record: any) => this.usuariosService.getUsuario(record.payload)
                    .pipe(
                        map(payload =>
                            fromUsuariosAction.LoadUsuarioSucess({ payload }),
                            catchError(error => of(fromUsuariosAction.LoadUsuarioFail({ error }))))
                    ))
            )
    )

    createUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.CREATE_USUARIO),
                exhaustMap((record: any) => this.usuariosService.addUsuario(record.payload)
                    .pipe(
                        map(payload =>
                            fromUsuariosAction.CreateUsuarioSucess({ payload }),
                            catchError(error => of(fromUsuariosAction.CreateUsuarioFail({ error }))))
                    ))
            )
    )

    updateUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.UPDATE_USUARIO),
                exhaustMap((record: any) => this.usuariosService.updateUsuario(record.payload)
                    .pipe(
                        map(payload =>
                            fromUsuariosAction.UpdateUsuario({ payload }),
                            catchError(error => of(fromUsuariosAction.UpdateUsuarioFail({ error }))))
                    ))
            )
    )

    deleteUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAction.usuariosTypeAction.DELETE_USUARIO),
                exhaustMap((record: any) => this.usuariosService.deleteUsuario(record.payload)
                    .pipe(
                        map(() =>
                        fromUsuariosAction.DeleteUsuarioSucess({ payload: record.payload }),
                            catchError(error => of(fromUsuariosAction.UpdateUsuarioFail({ error }))))
                    ))
            )
    )
}