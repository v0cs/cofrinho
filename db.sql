-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS controle_financeiro;
USE controle_financeiro;

-- Criação da tabela usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome VARCHAR(100) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Criação da tabela movimentacoes
CREATE TABLE IF NOT EXISTS movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM('Despesa', 'Receita') NOT NULL,
    categoria_id INT,
    descricao TEXT,
    data DATE NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
