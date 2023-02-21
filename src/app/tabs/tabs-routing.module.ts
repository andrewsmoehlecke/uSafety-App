import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlterarSenhaPage } from '../alterar-senha/alterar-senha.page';
import { CriarTopicoPage } from '../criar-topico/criar-topico.page';
import { DiscussaoPage } from '../discussao/discussao.page';
import { DiscussoesPage } from '../discussoes/discussoes.page';
import { DuvidaPage } from '../duvida/duvida.page';
import { DuvidasPage } from '../duvidas/duvidas.page';
import { MeuPerfilPage } from '../meu-perfil/meu-perfil.page';
import { TopicoPage } from '../topico/topico.page';
import { TopicosPage } from '../topicos/topicos.page';
import { UsuarioPage } from '../usuario/usuario.page';
import { UsuariosPage } from '../usuarios/usuarios.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'topicos',
        component: TopicosPage
      },
      {
        path: 'topico',
        component: TopicoPage
      },
      {
        path: 'duvidas',
        component: DuvidasPage
      },
      {
        path: 'duvida',
        component: DuvidaPage
      },
      {
        path: 'discussoes',
        component: DiscussoesPage
      },
      {
        path: 'discussao',
        component: DiscussaoPage
      },
      {
        path: 'criar-topico',
        component: CriarTopicoPage
      },
      {
        path: 'meu-perfil',
        component: MeuPerfilPage
      },
      {
        path: 'usuarios',
        component: UsuariosPage
      },
      {
        path: 'usuario',
        component: UsuarioPage
      },
      {
        path: 'alterar-senha',
        component: AlterarSenhaPage
      },
      {
        path: '',
        redirectTo: '/tabs/topicos',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
