var database = require("../database/config");

function listarPorFrigorifico(idFrigorifico) {
    console.log("Entrei na model listar por Frigorifico")
        instrucao = `
    select sf.fkfrigo,
    f.nomeFrigo,
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
    d.data_medicao
    
    from frigorifico f
    inner join salas_frias sf on f.id = sf.fkfrigo
    inner join sensor s on s.fkSala = sf.id
    inner join dados d on d.fksensor = s.id
    where f.id = ${idFrigorifico} 
    group by f.nomeFrigo, sf.nomeSala, s.id, d.sensor_analogico, Status_alerta, d.data_medicao
    order by 
    case 
        when Status_alerta = 'Crítico' then 1
        when Status_alerta = 'Alerta' then 2
        else 3
    end`;
    console.log(instrucao)
    return database.executar(instrucao);
}


module.exports = {
     listarPorFrigorifico
};
