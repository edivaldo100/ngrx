import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects/src";
import { of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { exhaustMap } from "rxjs/internal/operators/exhaustMap";
import { map } from "rxjs/internal/operators/map";
import { UsuariosService } from "src/app/Repository/UsuariosService";
import * as fromUsuariosAtion from "./usuarios.actions"

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
                ofType(fromUsuariosAtion.usuariosTypeAction.LOAD_USUARIOS),//tipo de ação e seu tipo de retorno - action que ira ser acapturada
                exhaustMap(() => this.usuariosService.getUsuarios()//acesso ao service -. quero q me retorne a lista de users
                    /**
                     * ao ir no service o retorno pode ser sucesso ou erro 
                     * aqui é mapeado estes 2 retornos
                     */
                    .pipe(
                        map(payload =>
                            fromUsuariosAtion.LoadUsuariosSucess({ payload }),//retorno sucesso com os dados
                            catchError(error => of(fromUsuariosAtion.LoadUsuariosFail({ error }))))//erro
                    ))
            )
    )

    loadUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAtion.usuariosTypeAction.LOAD_USUARIO),
                exhaustMap((record: any) => this.usuariosService.getUsuario(record.payload)
                    .pipe(
                        map(payload =>
                            fromUsuariosAtion.LoadUsuarioSucess({ payload }),
                            catchError(error => of(fromUsuariosAtion.LoadUsuarioFail({ error }))))
                    ))
            )
    )

    createUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAtion.usuariosTypeAction.CREATE_USUARIO),
                exhaustMap((record: any) => this.usuariosService.addUsuario(record.payload)
                    .pipe(
                        map(payload =>
                            fromUsuariosAtion.CreateUsuarioSucess({ payload }),
                            catchError(error => of(fromUsuariosAtion.CreateUsuarioFail({ error }))))
                    ))
            )
    )

    updateUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAtion.usuariosTypeAction.UPDATE_USUARIO),
                exhaustMap((record: any) => this.usuariosService.updateUsuario(record.payload)
                    .pipe(
                        map(payload =>
                            fromUsuariosAtion.UpdateUsuario({ payload }),
                            catchError(error => of(fromUsuariosAtion.UpdateUsuarioFail({ error }))))
                    ))
            )
    )

    deleteUsuario$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUsuariosAtion.usuariosTypeAction.DELETE_USUARIO),
                exhaustMap((record: any) => this.usuariosService.deleteUsuario(record.payload)
                    .pipe(
                        map(() =>
                            fromUsuariosAtion.DeleteUsuarioSucess({ payload: record.payload }),
                            catchError(error => of(fromUsuariosAtion.UpdateUsuarioFail({ error }))))
                    ))
            )
    )
}