USE ControlBeef;

CREATE TABLE estado(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeE VARCHAR(70),
    sigla CHAR(2)
);

INSERT INTO estado (nomeE, sigla) VALUES 
('São Paulo', 'SP'),
('Minas Gerais', 'MG');

CREATE TABLE cidade(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeC VARCHAR(70),
    fkestado INT,
    CONSTRAINT fkestado_cidade FOREIGN KEY (fkestado) REFERENCES estado(id)
);

INSERT INTO cidade (nomeC, fkestado) VALUES 
('São Paulo', 1),
('Campinas', 1),
('Belo Horizonte', 2);

CREATE TABLE endereco(
    id INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(100),
    cep CHAR(8),
    numero INT,
    bairro VARCHAR(50),
    fkcidade INT,
    CONSTRAINT fk_cidade_endereco FOREIGN KEY (fkcidade) REFERENCES cidade(id)
);

INSERT INTO endereco (logradouro, cep, numero, bairro, fkcidade) VALUES 
('Rua das Carnes', '01010100', 123, 'Centro', 1),
('Av. Frigorífica', '13050100', 456, 'Indústria', 2),
('Rua Congelada', '30120100', 789, 'Frio', 3);

CREATE TABLE empresa(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(50),
    fkendereco INT,
    representante VARCHAR(40),
    telefone CHAR(10),
    CONSTRAINT fkendereco_empresa FOREIGN KEY (fkendereco) REFERENCES endereco(id)
);

INSERT INTO empresa (nomeEmpresa, fkendereco, representante, telefone) VALUES 
('ControlBeef Ltda.', 1, 'João Silva', '1199999999');

CREATE TABLE usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(40),
    fkempresa INT,
    email VARCHAR(60) UNIQUE,
    senha VARCHAR(60),
    telefone CHAR(20),
    CONSTRAINT fkEmpresa_usuario FOREIGN KEY (fkempresa) REFERENCES empresa(id)
);

INSERT INTO usuario (nomeUsuario, fkempresa, email, senha, telefone) VALUES 
('Administrador', 1, 'admin@controlbeef.com', 'senha123', '11988887777'),
('Técnico Sensorial', 1, 'tecnico@controlbeef.com', 'sensor456', '11977776666');

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
('Sala 1 - Carnes Bovinas', 1, 'Bovinos'),
('Sala 2 - Aves', 1, 'Aves'),
('Sala 3 - Peixes', 2, 'Pescados');


CREATE TABLE sensor(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkSala INT,
    CONSTRAINT fksala_sensor FOREIGN KEY (fkSala) REFERENCES salas_frias(id)
);

INSERT INTO sensor (fkSala) VALUES 
(1), (1), (2), (3);

CREATE TABLE dados(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fksensor INT DEFAULT 1,
    sensor_analogico DECIMAL(3,2),
    data_medicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fksensor_dados FOREIGN KEY (fksensor) REFERENCES sensor(id)
);

