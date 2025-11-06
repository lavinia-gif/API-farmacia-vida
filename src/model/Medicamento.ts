import { MedicamentosDTO } from "./";
import { DatabaseModel } from "./DataBaseModel.js"; 

const database = new DatabaseModel().pool;


class Medicamento {

    // Atributos
    private idMedicamento: number = 0;
    private nome: string;
    private lote: string;
    private preco: string;

  
    constructor(
        _nome: string,
        _lote: string,
        _preco: string,
       
    ) {
        this.nome = _nome;
        this.lote= _lote;
        this.preco = _preco;
        
    }

    
    public getIdMedico(): number {
        return this.idMedicamento;
    }

    
    public setIdMedicamento(idMedicamento: number): void {
        this.idMedicamento = idMedicamento;
    }

    
    public getNome(): string {
        return this.nome;
    }

   
    public setNome(nome: string): void {
        this.nome = nome;
    }

   
    public getlote(): string {
        return this.lote;
    }

   
    public setlote(cpf: string): void {
        this.lote = this.lote;
    }

   
    public getPreco(): string {
        return this.preco;
    }

    
    
     
    public setPreco(preco: string): void {
        this.preco = preco;
    }


    
    
    static async listarClientes(): Promise<Array<Medicamento> | null> {
        try {
           
            let listaDeMedicamentos: Array<Medicamento> = [];
            const querySelectMedicamento = `SELECT * FROM medicamentos;`;
            const respostaBD = await database.query(querySelectMedicamento);
            respostaBD.rows.forEach((medicamentoBD) => {
               
                const novoCliente: Medicamento = new Medicamento(
                    medicamentoBD.nome,
                    medicamentoBD.lote,
                    medicamentoBD.preco
                   
                );

                novoMedicamento.setIdMedicamento(medicamentoBD.id_medicamento);

             
                listaDeMedicamentos.push(n);
            });

            return listaDeMedicamentos;
        } catch (error) {
           
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

    
    static async cadastrarMedicamento(Medicamento: MedicamentoDTO): Promise<boolean> {
        try {
            const queryInsertMedicamento = `INSERT INTO Medicamento (nome, lote, preco)
                                VALUES
                                ($1, $2, $3)
                                RETURNING id_Medicamento;`;

        
            const respostaBD = await database.query(queryInsertMedicamento, [
                Medicamento.nome.toUpperCase(), 
                Medicamento.lote,                
                Medicamento.preco
                         
            ]);

          
            if (respostaBD.rows.length > 0) {
              
                console.info(`Medicamento cadastrado com sucesso. ID: ${respostaBD.rows[0].id_medicamento}`);
                return true;
            }
            return false;
        } catch (error) {
            
            console.error(`Erro na consulta ao banco de dados. ${error}`);

           
            return false;
        }
    }

    static async listarMedicamento(idMedicamento: number): Promise<Medicamento| null> {
        try {
            
            const querySelectMedicamento = `SELECT * FROM medicamento WHERE id_medicamento=$1;`;


            const respostaBD = await database.query(querySelectMedicamento, [idMedicamento]);

            
            if(respostaBD.rowCount != 0) {
                
                const Medicamento: Medicamento = new MedicamentoDTO(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].lote,
                    respostaBD.rows[0].preco,
                    
                );

         
                Medicamento.setIdMedicamento(respostaBD.rows[0].id_medicamento);

              
                return Medicamento;
            }

           
            return null;
        } catch (error) {
          
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);

           
            return null;
        }
    }
}

export default Medicamento;