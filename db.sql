-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS controle_financeiro;
USE controle_financeiro;

-- Criação da tabela Users
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Criação da tabela Categories
CREATE TABLE IF NOT EXISTS Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome VARCHAR(100) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Criação da tabela Movimentations
CREATE TABLE IF NOT EXISTS Movimentations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM('Despesa', 'Receita') NOT NULL,
    categoria_id INT,
    descricao TEXT,
    data DATETIME NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES Categories(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Inserir dados de teste
-- Supondo que o usuário com email 'ttt@gmail.com' já exista com id 1
-- Adicionar categorias
INSERT INTO Categories (nome, usuario_id, createdAt, updatedAt) VALUES
('Alimentação', 1, NOW(), NOW()),
('Transporte', 1, NOW(), NOW()),
('Lazer', 1, NOW(), NOW()),
('Educação', 1, NOW(), NOW()),
('Saúde', 1, NOW(), NOW()),
('Moradia', 1, NOW(), NOW()),
('Investimentos', 1, NOW(), NOW()),
('Roupas', 1, NOW(), NOW()),
('Tecnologia', 1, NOW(), NOW()),
('Outros', 1, NOW(), NOW());

-- Obter os IDs das categorias recém-criadas
SET @cat1 = (SELECT id FROM Categories WHERE nome = 'Alimentação' AND usuario_id = 1);
SET @cat2 = (SELECT id FROM Categories WHERE nome = 'Transporte' AND usuario_id = 1);
SET @cat3 = (SELECT id FROM Categories WHERE nome = 'Lazer' AND usuario_id = 1);
SET @cat4 = (SELECT id FROM Categories WHERE nome = 'Educação' AND usuario_id = 1);
SET @cat5 = (SELECT id FROM Categories WHERE nome = 'Saúde' AND usuario_id = 1);
SET @cat6 = (SELECT id FROM Categories WHERE nome = 'Moradia' AND usuario_id = 1);
SET @cat7 = (SELECT id FROM Categories WHERE nome = 'Investimentos' AND usuario_id = 1);
SET @cat8 = (SELECT id FROM Categories WHERE nome = 'Roupas' AND usuario_id = 1);
SET @cat9 = (SELECT id FROM Categories WHERE nome = 'Tecnologia' AND usuario_id = 1);
SET @cat10 = (SELECT id FROM Categories WHERE nome = 'Outros' AND usuario_id = 1);

-- Adicionar movimentações
INSERT INTO Movimentations (tipo, descricao, data, valor, categoria_id, usuario_id, createdAt, updatedAt) VALUES
('Despesa', 'Compras de supermercado', '2024-01-05', 200.50, @cat1, 1, NOW(), NOW()),
('Despesa', 'Passagem de ônibus', '2024-01-06', 3.80, @cat2, 1, NOW(), NOW()),
('Despesa', 'Cinema', '2024-01-07', 35.00, @cat3, 1, NOW(), NOW()),
('Despesa', 'Curso online', '2024-01-08', 150.00, @cat4, 1, NOW(), NOW()),
('Despesa', 'Consulta médica', '2024-01-09', 250.00, @cat5, 1, NOW(), NOW()),
('Despesa', 'Aluguel', '2024-01-10', 1200.00, @cat6, 1, NOW(), NOW()),
('Receita', 'Salário', '2024-01-10', 3500.00, @cat7, 1, NOW(), NOW()),
('Despesa', 'Compra de roupas', '2024-01-11', 300.00, @cat8, 1, NOW(), NOW()),
('Despesa', 'Novo smartphone', '2024-01-12', 1500.00, @cat9, 1, NOW(), NOW()),
('Despesa', 'Outras despesas', '2024-01-13', 100.00, @cat10, 1, NOW(), NOW());
