var database = require("../database/config");

function totalSalasFrigo(idEmpresa, idFrigo) {
    instrucao = `
      select 
    count(sf.id) as totalSalas
    from empresa e
    inner join frigorifico f on f.fkempresa = e.id
    inner join salas_frias sf on sf.fkfrigo = f.id
    where e.id = ${idEmpresa} and f.id = ${idFrigo};
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}



function totalSalasIdealFrigo(idEmpresa, idFrigo) {
    instrucao = `
     select
     count(*) as salasIdealFrigo
from 
(select 
    f.nomeFrigo,
    sf.nomeSala,
    avg(d.sensor_analogico) as media_sala
from empresa e
inner join frigorifico f on f.fkempresa = e.id
inner join salas_frias sf on sf.fkfrigo = f.id
inner join sensor s on sf.id = s.fkSala
inner join dados d on d.fksensor = s.id
where e.id = ${idEmpresa} and f.id = ${idFrigo}

    group by f.nomeFrigo, sf.nomeSala
    having avg(d.sensor_analogico) between -3 and 4
    ) as sub
    group by nomeFrigo
;`
    console.log(instrucao)
    return database.executar(instrucao);
}




function totalSalasNIdealFrigo(idEmpresa, idFrigo) {
    instrucao = `
    select
    count(*) as salasNIdealFrigo
from 
(select 
    f.nomeFrigo,
    sf.nomeSala,
    avg(d.sensor_analogico) as media_sala
from empresa e
inner join frigorifico f on f.fkempresa = e.id
inner join salas_frias sf on sf.fkfrigo = f.id
inner join sensor s on sf.id = s.fkSala
inner join dados d on d.fksensor = s.id
where e.id = ${idEmpresa} and f.id = ${idFrigo}

    group by f.nomeFrigo, sf.nomeSala
    having avg(d.sensor_analogico) not between -3 and 4
    ) as sub
    group by nomeFrigo
;`
    console.log(instrucao)
    return database.executar(instrucao);
}



function listarSalas(idEmpresa,idFrigorifico){
    console.log("Chegeui no model listar salas");

    var instrucao = 
    `
    select
f.id,
sf.id,
sf.nomeSala,
truncate(avg(d.sensor_analogico), 2) as temperatura_media_sala
from empresa e
inner join frigorifico f on e.id = f.fkempresa
inner join salas_frias sf on sf.fkfrigo = f.id
inner join sensor s on sf.id = s.fkSala
inner join dados d on d.fksensor = s.id
where e.id = ${idEmpresa} and f.id = ${idFrigorifico}
group by f.nomeFrigo, sf.nomeSala, sf.id; 
    `
    return database.executar(instrucao)
}

function dadosSala(idSala){
    console.log("Cheguei no model dadosSala")
    instrucao = 
    `
    select * from salas_frias where id = ${idSala};
    `
    return database.executar(instrucao);
}

function criarGrafico(idSala){
    console.log("Entrei no model criar gráfico")
    var instrucao =
    `
    select 
    sf.nomeSala,
    truncate(avg(d.sensor_analogico), 2),
    max(d.data_medicao) as Data_atual
    from empresa e
    inner join frigorifico f on e.id = f.fkempresa
    inner join salas_frias sf on sf.fkfrigo = f.id
    inner join sensor s on sf.id = s.fkSala
    inner join dados d on d.fksensor = s.id
    where sf.id = ${idSala} 
    group by sf.nomeSala;
    `;
    return database.executar(instrucao);
}


module.exports = {
    totalSalasFrigo,
    totalSalasIdealFrigo,
    totalSalasNIdealFrigo,
    listarSalas,
    dadosSala,
    criarGrafico
};
