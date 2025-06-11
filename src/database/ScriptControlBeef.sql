CREATE DATABASE IF NOT EXISTS ControlBeef;
USE ControlBeef;


    -- -------------------------------------------------------------------------------------
    -- Tabelas de endereco
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
    ('São Paulo', 1);




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
    ('Avenida Marginal Direita do Tietê', '05118100', 500, null, 'Vila Jaguara', 1),
    ('Avenida Queiroz Filho,', '05319000', 1560, null, 'Vila Hamburguesa', 1),
    ('Rua Doutor Gabriel de Oliveira Rocha', '18681030', 704, null, 'Vila Maria Cristina', 1);


    INSERT INTO endereco (logradouro, cep, numero, complemento, bairro, fkcidade) VALUES 
    ('Av. Central 1500', '04567890', 1500, 'Setor 1', 'Jardim Central', 1),        
    ('Rua do Frio 300', '04567891', 300, 'Bloco C', 'Vila Frigorífica', 1),            

    ('Rodovia das Carnes 50', '07890123', 50, 'Lote 5', 'Distrito Agroindustrial', 1),  
    ('Rua da Fábrica 400', '07890124', 400, 'Galpão D', 'Vila Industrial', 1),        

    ('Av. Frigorífico 900', '03456789', 900, 'Galpão E', 'Bairro Industrial', 1),      
    ('Rua dos Carnes 250', '03456790', 250, 'Bloco F', 'Vila Frigorífica', 1); 

    -- -------------------------------------------------------------------------------------
    -- Tabelas gerenciamento usuários

    CREATE TABLE empresa(
        id INT PRIMARY KEY AUTO_INCREMENT,
        razao_social VARCHAR(50),
        fkendereco INT unique,
        representante VARCHAR(40),
        telefone VARCHAR(11),
        cnpj CHAR(14),
        codigo_ativacao VARCHAR(50),
        CONSTRAINT fkendereco_empresa FOREIGN KEY (fkendereco) REFERENCES endereco(id)
    );
    INSERT INTO empresa (razao_social, fkendereco, representante, telefone, cnpj, codigo_ativacao) VALUES 
    ('ControlBeef', 1, 'Lucas Canuto Previtero', '11953101496', '47697046822', 'CBCODElm35'),
    ('Friboi Ltda.', 2, 'João Silva', '1131444000', '02916265002707', 'CBCODE1lm35'),
    ('Marfrig', 3, 'Ednaldo Pereira', '1137928653', '03853896000140', 'CBCODE2lm35'),
    ('Frigol Indústria de Alimentos Ltda', 4, 'Carlos Silva', '11987654321', '12345678000199', 'CBCODE3lm35');






    CREATE TABLE usuario(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(40),
        email VARCHAR(60) UNIQUE,
        senha VARCHAR(60),
        fkempresa INT NOT NULL,
        CONSTRAINT fkEmpresa_usuario FOREIGN KEY (fkempresa) REFERENCES empresa(id)
    );
    INSERT INTO usuario (nome, email, senha, fkempresa) VALUES 
    ('ADMFriboi', 'admin@friboi.com', 'senha123', 2),
    ('ADMMarfrig', 'admin@marfrig.com', 'senha123', 3),
    ('ADMFrigol', 'admin@frigol.com', 'senha123', 4);

    INSERT INTO usuario (nome, email, senha, fkempresa) VALUES 
    ('Celina Benedito', 'celina.benedito@sptech.school', '123', 1),
    ('Gabriel Rapani', 'gabriel.rapani@sptech.school', '123',  1), 
    ('Vitorio Bearari', 'vitorio.bearari@sptech.school', '123', 1),
    ('Gustavo Menezes', 'gustavo.menezes@sptech.school', '123', 1),
    ('Lucas Previtero', 'lucas.previtero@sptech.school', '123',  1);

    -- -------------------------------------------------------------------------------------
    -- Tabelas gerenciamentos frigoríficos
    CREATE TABLE frigorifico(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nomeFrigo VARCHAR(30),
        fkendereco INT unique,
        fkempresa INT,
        CONSTRAINT fkEmpresa_frigorifico FOREIGN KEY (fkempresa) REFERENCES empresa(id),
        CONSTRAINT fkendereco_frigorifico FOREIGN KEY (fkendereco) REFERENCES endereco(id)
    );
    INSERT INTO frigorifico (nomeFrigo, fkendereco, fkempresa) VALUES 
    ('Friboi Frigorífico 1', 4, 2),
    ('Friboi Frigorífico 2', 5, 2),

    ('Marfrig Frigorífico 1', 6, 3),
    ('Marfrig Frigorífico 2', 7, 3),

    ('Frigol Frigorífico 1', 8, 4),
    ('Frigol Frigorífico 2', 9, 4);



    CREATE TABLE salas_frias(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nomeSala VARCHAR(30),
        fkfrigo INT,
        setor VARCHAR(30),
        CONSTRAINT fkFrigorifico_salasFrias FOREIGN KEY (fkfrigo) REFERENCES frigorifico(id)
    );
    INSERT INTO salas_frias(nomeSala, fkfrigo, setor) VALUES
    ('Sala 1', 1, 1),
    ('Sala 2', 1, 1),
    ('Sala 3', 1, 2),
    ('Sala 4', 1, 2),

    ('Sala 1', 2, 1),
    ('Sala 2', 2, 1),
    ('Sala 3', 2, 2),
    ('Sala 4', 2, 2),

    ('Sala 1', 3, 1),
    ('Sala 2', 3, 1),
    ('Sala 3', 3, 2),
    ('Sala 4', 3, 2),
    
	('Sala 1', 4, 1),
    ('Sala 2', 4, 1),
    ('Sala 3', 4, 2),
    ('Sala 4', 4, 2),

    ('Sala 1', 5, 1),
    ('Sala 2', 5, 1),
    ('Sala 3', 5, 2),
    ('Sala 4', 5, 2),

    ('Sala 1', 6, 1),
    ('Sala 2', 6, 1),
    ('Sala 3', 6, 2),
    ('Sala 4', 6, 2);




    CREATE TABLE sensor(
        id INT PRIMARY KEY AUTO_INCREMENT,
        fkSala INT,
        CONSTRAINT fksala_sensor FOREIGN KEY (fkSala) REFERENCES salas_frias(id)
    );
    INSERT INTO sensor (fkSala) VALUES 
    (1),
    (1),
    (2),
    (2),
    (3),
    (3),
    (4),
    (4),
    
    (5),
    (5),
    (6),
    (6),
    (7),
    (7),
    (8),
    (8),
    
    (9),
    (9),
    (10),
    (10),
    (11),
    (11),
    (12),
    (12),
    
    (13),
    (13),
    (14),
    (14),
    (15),
    (15),
    (16),
    (16),
    
    (17),
    (17),
    (18),
    (18),
    (19),
    (19),
    (20),
    (20),
    
    (21),
    (21),
    (22),
    (22),
    (23),
    (23),
    (24),
    (24);



    CREATE TABLE dados(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        fksensor INT DEFAULT 1,
        sensor_analogico DECIMAL(10,2),
        data_medicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fksensor_dados FOREIGN KEY (fksensor) REFERENCES sensor(id)
    );
   

    CREATE TABLE aviso (
        id INT PRIMARY KEY AUTO_INCREMENT,
        dataHora datetime default now() not null,
        temperatura decimal(10, 2) not null,
        fkSala int not null,
        FOREIGN KEY (fkSala) REFERENCES salas_frias(id)
    );





   DELIMITER $$
    CREATE TRIGGER atualizar_avisos
AFTER INSERT ON controlbeef.dados
FOR EACH ROW
BEGIN
    DECLARE idSala INT;
    DECLARE tempMedia DECIMAL(5,2);

    SELECT s.fkSala INTO idSala
    FROM sensor s
    WHERE s.id = NEW.fkSensor;

    SELECT truncate(AVG(d.sensor_analogico), 2)
    INTO tempMedia
    FROM dados d
    INNER JOIN sensor s ON d.fkSensor = s.id
    WHERE s.fkSala = idSala;

    if tempMedia > 4 OR tempMedia < -3 THEN
        INSERT INTO aviso (temperatura, fkSala)
        VALUES (tempMedia, idSala);
    END IF;

END$$

DELIMITER ;
