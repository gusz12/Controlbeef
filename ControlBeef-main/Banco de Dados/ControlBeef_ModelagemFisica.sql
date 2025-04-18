create database if not exists ControlBeef;
use ControlBeef;

CREATE TABLE endereco(
id int primary key auto_increment,
logradouro varchar(100),
cep char(8),
numero int8,
bairro varchar(50),
fkcidade INT
);
CREATE TABLE pais(
id int primary key auto_increment,
nomeP varchar(70),
prefixo int
);
CREATE TABLE estado(
id int primary key auto_increment,
nomeE varchar(70),
sigla char(02),
fkpais int,
constraint fkpais_estado foreign key (fkpais) references pais(id),
constraint chk_sigla check (sigla<=2)
);
CREATE TABLE cidade(
id int primary key auto_increment,
nomeC varchar(70),
fkestado int,
constraint fkestado_cidade foreign key (fkestado) references estado(id)
);
CREATE TABLE empresa(
id int primary key auto_increment,
nomeEmpresa varchar(50),
fkendereco int,
representante varchar(40),
telefone char(10),
constraint fkendereco_empresa foreign key (fkendereco) references endereco(id)
);
CREATE TABLE usuario(
id int primary key auto_increment,
nomeUsuario varchar(40),
fkempresa int,
constraint fkEmpresa_usuario foreign key (fkempresa) references empresa(id)
);
CREATE TABLE frigorifico(
id int primary key auto_increment,
nomeFrigo varchar(30),
fkendereco int,
fkempresa int,
constraint fkEmpresa_frigorifico foreign key (fkempresa) references empresa(id),
constraint fkendereco_frigorifico foreign key (fkendereco) references endereco(id)
);
CREATE TABLE salas_frias(
id int primary key auto_increment,
nomeSala varchar(30),
fkfrigo int,
setor varchar(30),
constraint fkFrigorifico_salasFrias foreign key (fkFrigo) references frigorifico(id)
);
CREATE TABLE sensor(
id int primary key auto_increment,
fkSala int,
constraint fksala_sensor foreign key (fkSala) references salas_frias(id)
);
CREATE TABLE dados(
fksensor int primary key,
temperatura decimal(4),
constraint fksensor_dados foreign key (fksensor) references sensor(id)
);