import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { Cliente } from 'src/app/models/cliente';
import { NgForm } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { CidadesService } from 'src/app/services/cidades.service';

@Component({
  selector: 'app-visualizar-cliente',
  templateUrl: './visualizar-cliente.component.html',
  styleUrls: ['./visualizar-cliente.component.css']
})
export class VisualizarClienteComponent implements OnInit {

  constructor(private cidService: CidadesService, private cliService: ClientesService, private activatedroute: ActivatedRoute, private router: Router) { }

  cliente = {} as Cliente;

  id: string | null = null;

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.paramMap.get("id");
    this.getClienteAtivadoById();
  }

  getClienteAtivadoById() {
    if(this.id != null || this.id != undefined || this.id != ""){
      this.cliService.findClienteAtivadoById(Number(this.id)).subscribe((cli: Cliente) => {
        this.cliente = cli;
      });
    }
  }

  onBack(): void {
    this.router.navigate(['cliente']);
  }

}
