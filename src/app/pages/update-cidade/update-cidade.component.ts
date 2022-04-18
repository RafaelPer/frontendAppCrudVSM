import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade';
import { NgForm } from '@angular/forms';
import { CidadesService } from 'src/app/services/cidades.service';

@Component({
  selector: 'app-update-cidade',
  templateUrl: './update-cidade.component.html',
  styleUrls: ['./update-cidade.component.css']
})
export class UpdateCidadeComponent implements OnInit {

  cidade = {} as Cidade;

  id: string | null = null;

  constructor(private cidService: CidadesService, private activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.paramMap.get("id");
    this.getCidadeAtivadaById();
  }

  getCidadeAtivadaById() {
    if(this.id != null || this.id != undefined || this.id != ""){
      this.cidService.findCidadeAtivadaById(Number(this.id)).subscribe((cid: Cidade) => {
        this.cidade = cid;
      });
    }
  }

  editarCidade(f: NgForm){
    console.log(f.value);
    if(f != undefined){
      if(f.value != undefined){
        if(this.cidade.cidadeIdPk != undefined){
          var ci: Cidade = {
            cidadeNome: f.value.nameCidadeNomeUp,
            cidadeUf: f.value.nameCidadeUfUp,
            cidadeDesativada: this.cidade.cidadeDesativada
          }
          console.log(ci);
          this.cidService.updateCidade(Number(this.cidade.cidadeIdPk), ci).subscribe(()=>{
            this.onBack(f);
          });
        }
      }
    }
  }

  onBack(form: NgForm): void {
    form.resetForm();
    this.router.navigate(['cidade']);
  }
}
