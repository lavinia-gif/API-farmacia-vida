import type { MedicamentosDTO } from "../interface/MedicamentosDTO.js";
import Medicamento from "../model/Medicamento.js";
import type { Request, Response } from "express";

class MedicamentosController  extends Medicamento {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
         
            const listarMedicamentos: Array<Medicamento> | null = await this.listarMedicamentos.Medicamentos();

            
            return res.status(200).json(this.listarMedicamentos);
        } catch (error) {
           
            console.error(`Erro ao consultar modelo. ${error}`);

         
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de clientes." });
        }
    }

    
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
          
            const respostaModelo = await Medicamento.cadastrarMedicamento(req.body as MedicamentosDTO);

           
            if (respostaModelo) {
               
                return res.status(201).json({ mensagem: "Medicamentos cadastrado com sucesso." });
            } else {
               
                return res.status(400).json({ mensagem: "Erro ao cadastrar Medicamento." });
            }
        } catch (error) {
           
            console.error(`Erro no modelo. ${error}`);

          
            return res.status(500).json({ mensagem: "Não foi possível inserir o Medicamento" });
        }
    }

    
    static async listarMedicamentos (req: Request, res: Response): Promise<Response> {
        try {
           
            const idMedicamentos: number = parseInt(req.params.idMedicamentos as string);

           
            if (isNaN(idMedicamentos) || idMedicamentos<= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

          
            const respostaModelo = await Medicamento.listarMedicamento(idMedicamentos);

           
            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum Medicamento encontrado com o ID fornecido." });
            }

            
            return res.status(200).json(respostaModelo);
        } catch (error) {
           
            console.error(`Erro ao acesso o modelo. ${error}`);

           
            return res.status(500).json({ mensagem: "Não foi possível recuperar o cliente." });
        }
    }
}

export default MedicamentosController;