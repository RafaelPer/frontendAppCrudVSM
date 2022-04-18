import { Component, OnInit } from '@angular/core';
import { Cidade } from 'src/app/models/cidade';
import { NgForm } from '@angular/forms';
import { CidadesService } from 'src/app/services/cidades.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {

  cidade = {} as Cidade;
  cidades: Cidade[] = [];

  constructor(private cidService: CidadesService) { 
    this.getCidades();
  }

  ngOnInit(): void {
    this.getCidades();
  }

  getCidades() {
    this.cidService.findAllCidades().subscribe((cid: Cidade[]) => {
      this.cidades = cid;
    });
  }

  atualizarLista(){
    this.getCidades();
  }

}
