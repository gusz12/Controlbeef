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





function KPItotal_frigo(idEmpresa) {
    instrucao =
        `select count(f.id) as total_frigo
        from frigorifico f 
        inner join empresa e on f.fkempresa = e.id
        where f.fkempresa = ${idEmpresa};
    `
    console.log(instrucao)
    return database.executar(instrucao)

}



function KPItotal_salas(idEmpresa) {
    instrucao =
        `
        select count(*) as total_salas
        from salas_frias sf
        inner join frigorifico f on sf.fkfrigo = f.id
        inner join empresa e on f.fkempresa = e.id
        where e.id = ${idEmpresa};
    `
    console.log(instrucao)
    return database.executar(instrucao)

}





function KPIsalas_ideal(idEmpresa) {
    instrucao =
        `
         select 
    count(*) as salas_ideal
    from
    (select
    e.razao_social,
    f.nomeFrigo,
    avg(d.sensor_analogico) as media_sala,
    case
	when avg(d.sensor_analogico) > -3 and avg(d.sensor_analogico) < 4 then 1
    else null
    end as verificacao_fora_ideal
    from empresa e
    inner join frigorifico f on f.fkempresa = e.id
    inner join salas_frias sf on sf.fkfrigo = f.id
    inner join sensor s on s.fkSala = sf.id
    inner join dados d on d.fksensor = s.id
    where e.id = ${idEmpresa}
    group by e.razao_social, f.nomeFrigo, sf.nomeSala) as medias_salas
    where verificacao_fora_ideal = 1;
    `
    console.log(instrucao)
    return database.executar(instrucao)

}



function KPIsalas_naoIdeal(idEmpresa) {
    instrucao =
        `
        select 
    count(*) as salas_naoIdeal
    from
    (select
    e.razao_social,
    f.nomeFrigo,
    avg(d.sensor_analogico) as media_sala,
    case
	when avg(d.sensor_analogico) > -3 and avg(d.sensor_analogico) < 4 then null
    else 1
    end as verificacao_fora_ideal
    from empresa e
    inner join frigorifico f on f.fkempresa = e.id
    inner join salas_frias sf on sf.fkfrigo = f.id
    inner join sensor s on s.fkSala = sf.id
    inner join dados d on d.fksensor = s.id
    where e.id = ${idEmpresa}
    group by e.razao_social, f.nomeFrigo, sf.nomeSala) as medias_salas
    where verificacao_fora_ideal = 1;
    `
    console.log(instrucao)
    return database.executar(instrucao)

}





function KPIfrigoGeral(idEmpresa, idFrigorifico) {

    instrucao =
        `
    
    `
    console.log(instrucao)
    return database.executar(instrucao)
}





module.exports = {
    listarFrigorificos,
    KPItotal_frigo,
    KPItotal_salas,
    KPIsalas_ideal,
    KPIsalas_naoIdeal,
    KPIfrigoGeral
};
