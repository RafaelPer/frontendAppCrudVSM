import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cidade } from '../models/cidade';
import { DesactiveItens } from '../models/desactive-itens';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

  url = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Credencials": "true", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*", "Access-Control-Allow-Headers": "*"})
  }


  findAllCidades(): Observable<Cidade[]>{
    return this.httpClient.get<Cidade[]>(this.url + 'getAllCidades')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  findAllCidadesAtivadas(): Observable<Cidade[]>{
    return this.httpClient.get<Cidade[]>(this.url + 'getAllCidadesAtivadas')
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  findCidadeAtivadaById(id: number): Observable<Cidade>{
    return this.httpClient.get<Cidade>(this.url + 'getCidadeByIdAndCidadeAtivada/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveCidade(cidade: Cidade): Observable<Cidade> {
    return this.httpClient.post<Cidade>(this.url + 'createCidade', JSON.stringify(cidade), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateCidade(id: number, cidade: Cidade): Observable<Cidade> {
    return this.httpClient.put<Cidade>(this.url + 'updateCidadeById/' + id, JSON.stringify(cidade), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // desactiveCidade(cidade: Cidade, isDesactive: DesactiveItens): Observable<Cidade>{
  //   return this.httpClient.put<Cidade>(this.url + 'alterStatusClienteById/' + cidade.cidadeIdPk, JSON.stringify(isDesactive), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);

    return throwError(errorMessage);
  };
}
