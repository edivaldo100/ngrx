import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../Models/UsuarioModel';
import { AppState } from '../Store/app.state';

import * as fromUsuariosAction from '../Store/usuarios/usuarios.actions';
import * as fromUsuariosSelector from '../Store/usuarios/usuarios.reducer';



@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {
  listaUsuarios: UsuarioModel[] = [];

  constructor(
    //private usuariosService: UsuariosService - remove pois vamos pela store
    private store: Store<AppState>
    ) {

  }

  ngOnInit(): void {

    //removendo o acesso ao service pois não preciso mais dele, por que vou acessa pela store
    // this.usuariosService.getUsuarios().subscribe((usuarios: UsuarioModel[]) => {
    //   this.listaUsuarios = usuarios;
    // });

    /**
     * implementar o acesso do componente a action
     */
    this.store.dispatch(fromUsuariosAction.LoadUsuarios())
  }

}



























