export interface PedidoVendaDTO {
    idPedido?: number,     
    idCliente: number,      
    idMedicamentos: number,      
    dataPedido: Date,      
    valorPedido: number,
    nomeCliente?: string,   
    situacao?: boolean      
}