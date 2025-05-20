CREATE DATABASE IF NOT EXISTS ControlBeef;
USE ControlBeef;

CREATE TABLE estado(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeE VARCHAR(70),
    sigla CHAR(2)
);
INSERT INTO estado (nomeE, sigla) VALUES 
('São Paulo', 'SP');







CREATE TABLE cidade(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeC VARCHAR(70),
    fkestado INT,
    CONSTRAINT fkestado_cidade FOREIGN KEY (fkestado) REFERENCES estado(id)
);
INSERT INTO cidade (nomeC, fkestado) VALUES 
('São Paulo', 1),
('Campinas', 1);







CREATE TABLE endereco(
    id INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(100),
    cep CHAR(8),
    numero INT,
    complemento varchar(50),
    bairro VARCHAR(50),
    fkcidade INT,
    CONSTRAINT fk_cidade_endereco FOREIGN KEY (fkcidade) REFERENCES cidade(id)
);
INSERT INTO endereco (logradouro, cep, numero, complemento, bairro, fkcidade) VALUES 
('Rua das Carnes', '01010100', 123, '10º andar','Centro', 1),
('Rua Congelada', '30120100', 789, '1º andar', 'Frio', 3);






CREATE TABLE empresa(
    id INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(50),
    fkendereco INT,
    representante VARCHAR(40),
    telefone CHAR(10),
    cnpj CHAR(14),
    codigo_ativacao VARCHAR(50)
    CONSTRAINT fkendereco_empresa FOREIGN KEY (fkendereco) REFERENCES endereco(id)
);
INSERT INTO empresa (razao_social, fkendereco, representante, telefone, cnpj, codigo_ativacao) VALUES 
('Friboi Ltda.', 1, 'João Silva', '1199999999', '12345678912345', 'CBCODElm35');



CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);


CREATE TABLE usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40),
    email VARCHAR(60) UNIQUE,
    senha VARCHAR(60),
    fkempresa INT,
    CONSTRAINT fkEmpresa_usuario FOREIGN KEY (fkempresa) REFERENCES empresa(id)
);
INSERT INTO usuario (nome, email, senha, fkempresa) VALUES 
('Administrador', 1, 'admin@controlbeef.com', 'senha123'),
('Técnico Sensorial', 1, 'tecnico@controlbeef.com', 'sensor456');






CREATE TABLE frigorifico(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeFrigo VARCHAR(30),
    fkendereco INT,
    fkempresa INT,
    CONSTRAINT fkEmpresa_frigorifico FOREIGN KEY (fkempresa) REFERENCES empresa(id),
    CONSTRAINT fkendereco_frigorifico FOREIGN KEY (fkendereco) REFERENCES endereco(id)
);
INSERT INTO frigorifico (nomeFrigo, fkendereco, fkempresa) VALUES 
('Frigorífico Central', 2, 1),
('Frigo Norte', 3, 1);






CREATE TABLE salas_frias(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeSala VARCHAR(30),
    fkfrigo INT,
    setor VARCHAR(30),
    CONSTRAINT fkFrigorifico_salasFrias FOREIGN KEY (fkfrigo) REFERENCES frigorifico(id)
);
INSERT INTO salas_frias (nomeSala, fkfrigo, setor) VALUES 
('Sala 1', 1, 1),
('Sala 2', 1, 2);







CREATE TABLE sensor(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkSala INT,
    CONSTRAINT fksala_sensor FOREIGN KEY (fkSala) REFERENCES salas_frias(id)
);
INSERT INTO sensor (fkSala) VALUES 
(1);






CREATE TABLE dados(
    fksensor INT DEFAULT 1,
    sensor_analogico DECIMAL(3,2),
    data_medicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (fksensor),
    CONSTRAINT fksensor_dados FOREIGN KEY (fksensor) REFERENCES sensor(id)
);