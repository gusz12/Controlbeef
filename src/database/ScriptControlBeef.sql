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
        fkendereco INT,
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


    select * from usuario;
    -- -------------------------------------------------------------------------------------
    -- Tabelas gerenciamentos frigoríficos
    CREATE TABLE frigorifico(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nomeFrigo VARCHAR(30),
        fkendereco INT,
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
    INSERT INTO dados (fksensor, sensor_analogico) VALUES
    (1, -2.5),
    (2, -3.0),
    (3, 0.5),
    (4, 1.2),
    (5, -4.7),  
    (6, 5.3),    
    (7, 2.0),
    (8, -2.2),
    (9, 3.8),
    (10, 4.1),  
    (11, -3.2),  
    (12, -10.5), 
    (13, 3.4),
    (14, 3.9),
    (15, 0.0),
    (16, 1.8),
    (17, 6.0),  
    (18, 7.8),  
    (19, -1.3),
    (20, -2.8),
    (21, 3.5),
    (22, 2.9),
    (23, -8.6),  
    (24, 0.7),
	(25, -2.5),
    (26, -3.0),
    (27, 0.5),
    (28, 1.2),
    (29, -4.7),  
    (30, 5.3),    
    (31, 2.0),
    (32, -2.2),
    (33, 3.8),
    (34, 4.1),  
    (35, -3.2),  
    (36, -10.5), 
    (37, 3.4),
    (38, 3.9),
    (39, 0.0),
    (40, 1.8),
    (41, 6.0),  
    (42, 7.8),  
    (43, -1.3),
    (44, -2.8),
    (45, 3.5),
    (46, 2.9),
    (47, -8.6),  
    (48, 0.7);



    CREATE TABLE aviso (
        id INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(100),
        descricao VARCHAR(150),
        fk_usuario INT,
        FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
    );



    -- Select para para os cards 
        select sf.fkfrigo,
        f.nomeFrigo,
    
        sf.nomeSala,
        s.id as número_sensor,
        d.sensor_analogico,
            case 
            when sensor_analogico > 4.0 then 'Crítico'
            when sensor_analogico < -3.0 then 'Crítico'
            when sensor_analogico = -3.0 then 'Alerta'
            when sensor_analogico = 4.0 then 'Alerta'
            else 'Ideal'
        end as Status_alerta,
        d.data_medicao

        from frigorifico f
        inner join salas_frias sf on f.id = sf.fkfrigo
        inner join sensor s on s.fkSala = sf.id
        inner join dados d on d.fksensor = s.id
        where f.fkempresa = 2 and f.id = 1
        
        group by f.nomeFrigo, sf.nomeSala, s.id, d.sensor_analogico, Status_alerta, d.data_medicao
        order by 
        case 
            when Status_alerta = 'Crítico' then 1
            when Status_alerta = 'Alerta' then 2
            else 3
        end;





    select 
    e.id as idEmpresa, e.razao_social as nomeEmpresa, e.representante,
    f.id as idFrigorifico, f.nomeFrigo as nomeFrigorifico, f.fkempresa,
    s.id as idSala, s.nomeSala, so.id as  idSensor, so.fkSala, d.    id as idDados,
    d.fksensor, d.sensor_analogico as dadosSensor, d.data_medicao as dataMedicao
    from empresa e
    inner join frigorifico f on e.id = f.fkempresa
    inner join salas_frias s on f.id = s.fkfrigo
    inner join sensor so on s.id = so.fkSala
    inner join dados d on so.id=d.fksensor
    where f.fkempresa = 2 and f.id = 1;








select * from usuario;



    -- Ranking de frigorificos maiores médias fora do ideal
    select
        sf.fkfrigo,
        f.nomeFrigo,
        s.fkSala as número_sala,
        sf.nomeSala,
        avg(d.sensor_analogico) as média_sala
        from frigorifico f
        inner join salas_frias sf on f.id = sf.fkfrigo
        inner join sensor s on s.fkSala = sf.id
        inner join dados d on d.fksensor = s.id
        where f.fkempresa = 2 and f.id = 2
        group by sf.fkfrigo,
        f.nomeFrigo,
        s.fkSala,
        sf.nomeSala
        having média_sala > 4 or média_sala < -3
    ;



    -- Nome sala 
    -- Quantidade de vezes fora da temperatura ideal 
    -- Tempo fora do ideal
    -- Mostrar vezes fora do ideal e tempo fora do ideal 
    use Controlbeef;
    select 
    sf.fkfrigo as Numero_Frigo,
    sf.nomeSala,
    concat(
    count(
        case 
            when d.sensor_analogico > 4 then 1
            when d.sensor_analogico < -3 then 1
            else null
        end
    )*2, ' Segundos') as Tempo_Fora_Ideal
    from salas_frias sf
    inner join frigorifico f on f.id = sf.fkfrigo
    inner join sensor s on s.fkSala = sf.id
    inner join dados d on d.fksensor = s.id
    where f.fkempresa = 2 and f.id = 1
    group by sf.fkfrigo, sf.nomeSala;





    -- Feito pelo chat
    SELECT 
        sf.fkfrigo AS Numero_Frigo,
        sf.nomeSala,
        COUNT(
            CASE 
                WHEN d.sensor_analogico > 4 THEN 1
                WHEN d.sensor_analogico < -3 THEN 1
                ELSE NULL
            END
        ) AS Quantidade_Vezes_Fora_Ideal
    FROM salas_frias sf
    INNER JOIN frigorifico f ON f.id = sf.fkfrigo
    INNER JOIN sensor s ON s.fkSala = sf.id
    INNER JOIN dados d ON d.fksensor = s.id
    WHERE f.fkempresa = 2 AND f.id = 1
    GROUP BY sf.fkfrigo, sf.nomeSala;
    select * from salas_frias;
    select * from dados;
    select * from sensor;




    -- select de verificação
    select * from frigorifico join salas_frias join sensor join dados;
    -- verificar se a empresa tem o frigorifigo
    select 
    e.id,
    e.razao_social,
    f.id,
    f.nomeFrigo
    from empresa e
    left join frigorifico f on e.id = f.fkempresa 
    where f.fkempresa = 2;




    select 
    e.id as idEmpresa, e.razao_social as nomeEmpresa, e.representante,
    f.id as idFrigorifico, f.nomeFrigo as nomeFrigorifico, f.fkempresa,
    s.id as idSala, s.nomeSala, so.id as  idSensor, so.fkSala, d.    id as idDados,
    d.fksensor, d.sensor_analogico as dadosSensor, d.data_medicao as dataMedicao
    from empresa e
    inner join frigorifico f on e.id = f.fkempresa
    inner join salas_frias s on f.id = s.fkfrigo
    inner join sensor so on s.id = so.fkSala
    inner join dados d on so.id=d.fksensor
    where f.fkempresa = 2 and f.id = 1;
    

    
select
count(
case 
	when d.sensor_analogico > 4 then 1
    when d.sensor_analogico < -3 then 1
    else null
end
) as qtdSalas_fora_ideal,
count(
case 
	when d.sensor_analogico between-3 and 4 then 1
    else null
end
) as qtdSalas_dentro_ideal,
count(sf.id) as salas_totais
from empresa e
inner join frigorifico f on e.id = f.fkempresa
inner join salas_frias sf on sf.fkfrigo = f.id
inner join sensor s on s.fksala = sf.id
inner join dados d on d.fksensor = s.id;

select * from dados;