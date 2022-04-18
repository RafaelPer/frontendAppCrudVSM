import {Cidade} from './cidade';

export interface Cliente {
    clienteIdPk?:number,
    clienteNome: string,
    clienteCPFCNPJ: string,
    clienteEnderecoLogradouro: string,
    clienteEnderecoNumero: string,
    clienteEnderecoBairro: string,
    clienteEnderecoCep: string,
    clienteEnderecoCidadeFk: Cidade,
    clienteTelefone: string,
    clienteEmail: string,
    clienteDesativado: boolean | null
}
