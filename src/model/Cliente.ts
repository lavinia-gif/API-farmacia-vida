import type { ClienteDTO } from "../interface/ClienteDTO.js";
import { DatabaseModel } from "./DataBaseModel.js"; 

const database = new DatabaseModel().pool;


class Cliente {

    // Atributos
    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private telefone: string;
    private email: string;

  
    constructor(
        _nome: string,
        _cpf: string,
        _telefone: string,
        _email: string
    ) {
        this.nome = _nome;
        this.cpf = _cpf;
        this.telefone = _telefone;
        this.email = _email;
    }

    
    public getIdCliente(): number {
        return this.idCliente;
    }

    
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    
    public getNome(): string {
        return this.nome;
    }

   
    public setNome(nome: string): void {
        this.nome = nome;
    }

   
    public getCpf(): string {
        return this.cpf;
    }

   
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

   
    public getTelefone(): string {
        return this.telefone;
    }

    
    
     
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }  
    
    
    static async listarClientes(): Promise<Array<Cliente> | null> {
        try {
           
            let listaDeClientes: Array<Cliente> = [];
            const querySelectClientes = `SELECT * FROM clientes;`;
            const respostaBD = await database.query(querySelectClientes);
            respostaBD.rows.forEach((clienteBD) => {
               
                const novoCliente: Cliente = new Cliente(
                    clienteBD.nome,
                    clienteBD.cpf,
                    clienteBD.telefone,
                    clienteBD.email
                );

                novoCliente.setIdCliente(clienteBD.id_cliente);

             
                listaDeClientes.push(novoCliente);
            });

            return listaDeClientes;
        } catch (error) {
           
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

    
    static async cadastrarCliente(cliente: ClienteDTO): Promise<boolean> {
        try {
            const queryInsertCliente = `INSERT INTO clientes (nome, cpf, telefone)
                                VALUES
                                ($1, $2, $3)
                                RETURNING id_cliente;`;

        
            const respostaBD = await database.query(queryInsertCliente, [
                cliente.nome.toUpperCase(), 
                cliente.cpf,                
                cliente.telefone,
                cliente.email           
            ]);

          
            if (respostaBD.rows.length > 0) {
              
                console.info(`Cliente cadastrado com sucesso. ID: ${respostaBD.rows[0].id_cliente}`);
                return true;
            }
            return false;
        } catch (error) {
            
            console.error(`Erro na consulta ao banco de dados. ${error}`);

           
            return false;
        }
    }

    static async listarCliente(idCliente: number): Promise<Cliente | null> {
        try {
            
            const querySelectCliente = `SELECT * FROM clientes WHERE id_cliente=$1;`;


            const respostaBD = await database.query(querySelectCliente, [idCliente]);

            
            if(respostaBD.rowCount != 0) {
                
                const cliente: Cliente = new Cliente(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].cpf,
                    respostaBD.rows[0].telefone,
                    respostaBD.rows[0].email
                );

         
                cliente.setIdCliente(respostaBD.rows[0].id_cliente);

              
                return cliente;
            }

           
            return null;
        } catch (error) {
          
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);

           
            return null;
        }
    }
}

export default Cliente;