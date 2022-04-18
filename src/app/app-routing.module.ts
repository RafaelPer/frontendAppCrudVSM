import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CidadeComponent } from './pages/cidade/cidade.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdateCidadeComponent } from './pages/update-cidade/update-cidade.component';
import { UpdateClienteComponent } from './pages/update-cliente/update-cliente.component';
import { VisualizarClienteComponent } from './pages/visualizar-cliente/visualizar-cliente.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'updateCliente/:id', component: UpdateClienteComponent},
  {path: 'visualizarCliente/:id', component: VisualizarClienteComponent},
  {path: 'cidade', component: CidadeComponent},
  {path: 'updateCidade/:id', component: UpdateCidadeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
