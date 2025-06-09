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



function KPIdash(idEmpresa, idFrigorifico) {

    instrucao =
        `
    
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
    KPIdash,
    KPIfrigoGeral
};
