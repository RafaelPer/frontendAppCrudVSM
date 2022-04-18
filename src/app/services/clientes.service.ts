import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { DesactiveItens } from '../models/desactive-itens';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  findAllClientes(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.url + 'getAllClientes')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  findClienteAtivadoById(id: number): Observable<Cliente>{
    return this.httpClient.get<Cliente>(this.url + 'getClienteByIdAndClienteAtivado/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  findClienteByCnpjAndClienteAtivado(cpfCnpj: string): Observable<Cliente>{
    console.log(cpfCnpj);
    return this.httpClient.get<Cliente>(this.url + 'getClienteByCpfCnpjAndClienteAtivado/' + cpfCnpj)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.url + 'createCliente', JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.url + 'updateClienteById/' + id, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  desactiveCliente(cliente: Cliente, isDesactive: DesactiveItens): Observable<Cliente>{
    console.log(isDesactive);
    console.log(cliente);
    return this.httpClient.put<Cliente>(this.url + 'alterStatusClienteById/' + cliente.clienteIdPk, JSON.stringify(isDesactive), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

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
