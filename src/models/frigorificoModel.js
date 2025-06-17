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



function listarSalas(idEmpresa, idFrigorifico) {
    console.log("Chegeui no model listar salas");

    var instrucao =
        `
  select
    f.nomeFrigo,
    sf.nomeSala,
    sf.nomeSala,
    sf.id,
    truncate(avg(d.sensor_analogico), 2) as temperatura_media_sala,
    case
		when avg(d.sensor_analogico) > 4 then 'Crítico'
        when avg(d.sensor_analogico) < -3 then 'Crítico'
        when avg(d.sensor_analogico) = -3 then 'Alerta'
        when avg(d.sensor_analogico) = 4 then 'Alerta'
        else 'Ideal'
	end 
	as status_alerta 
    from empresa e
    inner join frigorifico f on e.id = f.fkempresa
    inner join salas_frias sf on sf.fkfrigo = f.id
    inner join sensor s on sf.id = s.fkSala
    inner join dados d on d.fksensor = s.id
    where e.id = ${idEmpresa} and f.id = ${idFrigorifico}
    group by f.nomeFrigo, sf.nomeSala, sf.id
    order by
    case 
		when status_alerta = 'Crítico' then 1
        when status_alerta = 'Alerta' then 2
        else 3
	end;
    `
    return database.executar(instrucao)
}






function dadosSala(idSala) {
    console.log("Cheguei no model dadosSala")
    instrucao =
        `
    select * from salas_frias where id = ${idSala};
    `
    return database.executar(instrucao);
}


function criarGrafico(idSala) {
    console.log("Entrei no model criar gráfico")
    
    var instrucao =
        `
    select 
        d.sensor_analogico as temperatura,
        (SELECT DATE_FORMAT(d.data_medicao, '%d/%m/%Y %H:%i:%s'))  as data_medicao
    from dados d
    inner join sensor s on d.fksensor = s.id
    inner join salas_frias sf on s.fkSala = sf.id
    where sf.id = ${idSala}
    order by d.data_medicao desc
    limit 10;
    `;
    return database.executar(instrucao);
}

function KpiTempAtual(idEmpresa, idFrigorifico, idSala) {
    console.log("Entrei no model KpiTempAtual")
    var instrucao =
        `
   select 
	sf.nomeSala,
    truncate(avg(d.sensor_analogico), 2) as TempMedia
	from empresa e
    inner join frigorifico f on e.id = f.fkempresa
    inner join salas_frias sf on sf.fkfrigo = f.id
    inner join sensor s on sf.id = s.fkSala
    inner join dados d on d.fksensor = s.id
    where e.id = ${idEmpresa} and f.id = ${idFrigorifico} and sf.id = ${idSala}
    group by sf.nomeSala;
    `;
    return database.executar(instrucao)
}


function tempoForaIdealSala(idEmpresa, idFrigorifico, idSala) {
    console.log("Entrei no model criar gráfico")
    var instrucao =
        `
   select
sf.nomeSala,
concat(
count(
	case 
		when d.sensor_analogico > 4 then 1
        when d.sensor_analogico < -3 then 1
		else null
	end
)*2, ' Minutos') as Tempo_Fora_Ideal
from salas_frias sf
inner join frigorifico f on f.id = sf.fkfrigo
inner join sensor s on s.fkSala = sf.id
inner join dados d on d.fksensor = s.id
where f.fkempresa = ${idEmpresa} and f.id = ${idFrigorifico} and sf.id = ${idSala}
group by sf.fkfrigo, sf.nomeSala;
    `;
    return database.executar(instrucao);
}








function avisoSalas(idEmpresa, idFrigorifico) {
    console.log("Entrei no model avisoSalas")
    var instrucao =
        `
   select  
   (SELECT DATE_FORMAT(d.data_medicao, '%d/%m/%Y %H:%i:%s'))  as data_hora, 
    concat((d.sensor_analogico), 'ºC') as temperatura,  
    d.fksensor  
from empresa e  
inner join frigorifico f on e.id = f.fkempresa  
inner join salas_frias sf on sf.fkfrigo = f.id  
inner join sensor s on sf.id = s.fkSala  
inner join dados d on d.fksensor = s.id  
where e.id = ${idEmpresa} and f.id = ${idFrigorifico}
having temperatura not between -3 and 4  
order by data_medicao desc
limit 10;
    `;
    return database.executar(instrucao);
}



module.exports = {
    totalSalasFrigo,
    totalSalasIdealFrigo,
    totalSalasNIdealFrigo,
    listarSalas,
    dadosSala,
    criarGrafico,
    KpiTempAtual,
    tempoForaIdealSala,
    avisoSalas
};
