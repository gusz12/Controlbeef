var database = require("../database/config");

function listarFrigorificos(fkEmpresa) {
    console.log(fkEmpresa)
    console.log("Entrei na model listar por Frigorifico")
    instrucao = `
    select sf.fkfrigo,
    f.nomeFrigo,
    f.id as idFrigorifico,
    s.fkSala as número_sala,
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
   (SELECT DATE_FORMAT(d.data_medicao, '%d/%m/%Y %H:%i:%s') as data_medicao)
    from frigorifico f
    inner join salas_frias sf on f.id = sf.fkfrigo
    inner join sensor s on s.fkSala = sf.id
    inner join dados d on d.fksensor = s.id
	where f.fkempresa = ${fkEmpresa}
    group by f.nomeFrigo, sf.nomeSala, s.id, d.sensor_analogico, Status_alerta, d.data_medicao
    order by 
    case 
        when Status_alerta = 'Crítico' then 1
        when Status_alerta = 'Alerta' then 2
        else 3
    end, sensor_analogico desc;
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}



function filtroFrigorifico(idEmpresa, idFrigorifico){

    console.log("Entrei no model filtro frigorifico")

    instrucao = 
    `
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
where f.fkempresa = ${idEmpresa} and f.id = ${idFrigorifico};
    `
    console.log(instrucao)
    return database.executar(instrucao)
}

module.exports = {
    listarFrigorificos,
    filtroFrigorifico
};
