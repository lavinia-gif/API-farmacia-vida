export interface PedidoVendaDTO {
    idPedido?: number,      // ID do pedido (opcional)
    idCliente: number,      // ID do cliente
    idMedicamentos: number,        // ID do carro
    dataPedido: Date,       // Data do pedido
    valorPedido: number,    // Valor do pedido
    nomeCliente?: string,   // Nome do cliente (opcional)
    situacao?: boolean      // Situação do pedido (opcional)
}