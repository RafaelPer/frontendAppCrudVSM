import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { Cliente } from 'src/app/models/cliente';
import { DesactiveItens } from 'src/app/models/desactive-itens';
import { NgForm } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { CidadesService } from 'src/app/services/cidades.service';

@Component({
  selector: 'app-update-cliente',
  templateUrl: './update-cliente.component.html',
  styleUrls: ['./update-cliente.component.css']
})
export class UpdateClienteComponent implements OnInit {

  cliente = {} as Cliente;

  cidades: Cidade[] = [];

  id: string | null = null;

  constructor(private cidService: CidadesService, private cliService: ClientesService, private activatedroute: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.paramMap.get("id");
    this.getClienteAtivadoById();
    this.getCidades();
  }

  getClienteAtivadoById() {
    if(this.id != null || this.id != undefined || this.id != ""){
      this.cliService.findClienteAtivadoById(Number(this.id)).subscribe((cli: Cliente) => {
        this.cliente = cli;
      });
    }
  }

  getCidades() {
    this.cidService.findAllCidades().subscribe((cid: Cidade[]) => {
      this.cidades = cid;
    });
  }

  editarCliente(f: NgForm){
    console.log(f.value);
    if(f != undefined){
      if(f.value != undefined){
        console.log(f.value.nameCidadeNomeUp);
        if(f.value.nameCidadeNomeUp != ''){
          if(this.cliente.clienteIdPk != undefined){
            var c: Cliente = {
              clienteNome: f.value.nameClienteNomeUp,
              clienteCPFCNPJ: f.value.nameClienteCPFCNPJUp,
              clienteEnderecoLogradouro: f.value.nameClienteEnderecoLogradouroUp,
              clienteEnderecoNumero: f.value.nameClienteEnderecoNumeroUp,
              clienteEnderecoBairro: f.value.nameClienteEnderecoBairroUp,
              clienteEnderecoCep: f.value.clienteEnderecoCepUp,
              clienteEnderecoCidadeFk: {cidadeIdPk: f.value.nameCidadeNomeUp},
              clienteTelefone: f.value.nameClienteTelefoneUp,
              clienteEmail: f.value.nameClienteEmailUp,
              clienteDesativado: this.cliente.clienteDesativado
            }
            console.log(c);
            this.cliService.updateCliente(Number(this.cliente.clienteIdPk), c).subscribe(()=>{
              this.onBack(f);
            });
          }
        }
      }
    }
  }

  onBack(form: NgForm): void {
    form.resetForm();
    this.router.navigate(['cliente']);
  }

}
