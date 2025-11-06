-- Criação da tabela 'clientes'
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL, 
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(50),
    telefone VARCHAR(16)
);

-- Criação da tabela 'medicamentos'
CREATE TABLE IF NOT EXISTS medicamentos (
    id_medicamentos SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    lote VARCHAR(50) NOT NULL,
    preco VARCHAR(50) NOT NULL
    
);

-- Criação da tabela 'pedidos'
CREATE TABLE IF NOT EXISTS pedidos(
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_medicamentos INT NOT NULL,
    data_pedido DATE NOT NULL,
    valor_pedido DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_medicamentos) REFERENCES medicamentos(id_medicamentos)
);

-- Inserts para a tabela 'cliente'
INSERT INTO clientes (nome, cpf, telefone,email) VALUES
('JOÃO SILVA', '12345678901', '11912345678','jao@email'),
('MARIA OLIVEIRA', '23456789012', '21912345678','maria@email'),
('CARLOS SOUZA', '34567890123', '31912345678','carlos@email'),
('ANA SANTOS', '45678901234', '41912345678','ana@email'),
('PAULO LIMA', '56789012345', '51912345678','paulo@email');

-- Inserts para a tabela 'medicamentos'
INSERT INTO medicamentos (nome,lote,preco) VALUES
('Dorflex ', 'DF251106A','12,90'),
('Neosaldina ','DF251106A','8,50'),
('Neosoro','DF251106A','22,30'),
('Torsilax','DF251106A','15,40'),
('Xarelto ','DF251106A','18,90');



-- Inserts para a tabela 'pedido'
INSERT INTO pedidos (id_cliente, id_medicamentos, data_pedido, valor_pedido) VALUES
(1, 5, '2023-09-10', 75000.00),
(2, 4, '2023-08-15', 68000.00),
(3, 3, '2023-07-20', 45000.00),
(4, 2, '2023-06-25', 78000.00),
(5, 1, '2023-05-30', 53000.00);