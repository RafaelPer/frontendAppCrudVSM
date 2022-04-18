import { Component, OnInit } from '@angular/core';
import { Cidade } from 'src/app/models/cidade';
import { Cliente } from 'src/app/models/cliente';
import { DesactiveItens } from 'src/app/models/desactive-itens';
import { NgForm } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { CidadesService } from 'src/app/services/cidades.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente = {} as Cliente;
  clientes: Cliente[] = [];

  cidade = {} as Cidade;
  cidades: Cidade[] = [];

  constructor(private cidService: CidadesService, private cliService: ClientesService) { 
    this.getCidades();
    this.getClientes();
  }

  ngOnInit(): void {
    this.getCidades();
    this.getClientes();
  }

  atualizarLista(){
    this.getClientes();
  }

  getClientes() {
    this.cliService.findAllClientes().subscribe((cli: Cliente[]) => {
      this.clientes = cli;
    });
  }

  getCidades() {
    this.cidService.findAllCidadesAtivadas().subscribe((cid: Cidade[]) => {
      this.cidades = cid;
    });
  }

  desativarCliente(cliente: Cliente){
    var desItens: DesactiveItens = {
      isDesactive: true
    }
    this.cliService.desactiveCliente(cliente, desItens).subscribe(() => {
      this.getClientes();
    });
  }

  saveCliente(f: NgForm){
    console.log(f.value);
    if(f != undefined){
      if(f.value != undefined){
        console.log(f.value.nameCidadeNome);
        if(f.value.nameCidadeNome != ''){
          var c: Cliente = {
            clienteNome: f.value.nameClienteNome,
            clienteCPFCNPJ: f.value.nameClienteCPFCNPJ,
            clienteEnderecoLogradouro: f.value.nameClienteEnderecoLogradouro,
            clienteEnderecoNumero: f.value.nameClienteEnderecoNumero,
            clienteEnderecoBairro: f.value.nameClienteEnderecoBairro,
            clienteEnderecoCep: f.value.clienteEnderecoCep,
            clienteEnderecoCidadeFk: {cidadeIdPk: f.value.nameCidadeNome},
            clienteTelefone: f.value.nameClienteTelefone,
            clienteEmail: f.value.nameClienteEmail,
            clienteDesativado: false
          }
          console.log(c);
          this.cliService.saveCliente(c).subscribe(()=>{
            this.getClientes();
          });
        }
      }
    }
  }

  cleanForm(form: NgForm) {
    this.getClientes();
    this.getCidades();
    form.resetForm();
    this.cliente = {} as Cliente;
    this.cidade = {} as Cidade;
  }

}
