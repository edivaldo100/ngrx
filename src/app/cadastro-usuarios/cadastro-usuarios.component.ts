import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../Models/UsuarioModel';
import { UsuariosService } from '../Repository/UsuariosService';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit{

model: UsuarioModel = {id: 0, nome: '', idade:0, perfil:''};

constructor(private usuariosService: UsuariosService){}

  ngOnInit(): void {
  }
  addUsuario(){
    if(this.model.id == 0){
      console.log("cadastrar");
      this.usuariosService.addUsuario(this.model).subscribe();
    }else{
      console.log("Alterar");
    }
  }
}
