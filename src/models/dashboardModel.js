var database = require("../database/config");

function listarSalasTotais(fkEmpresa) {
    console.log(fkEmpresa)
    console.log("Entrei na model listar salas Totais")
    instrucao = `
    SELECT 
    f.id as idFrigo,
    sf.fkfrigo,
    f.nomeFrigo,
    sf.id as número_sala,
    sf.nomeSala,
    COUNT(s.id) as quantidade_sensores,
    TRUNCATE(AVG(d.sensor_analogico), 2) as temperatura_media,
    CASE 
        WHEN AVG(d.sensor_analogico) > 4.0 THEN 'Crítico'
        WHEN AVG(d.sensor_analogico) < -3.0 THEN 'Crítico'
        WHEN AVG(d.sensor_analogico) = -3.0 THEN 'Alerta'
        WHEN AVG(d.sensor_analogico) = 4.0 THEN 'Alerta'
        WHEN AVG(d.sensor_analogico) IS NULL THEN 'Sem Dados'
        ELSE 'Ideal'
    END as Status_alerta,
    MAX(d.data_medicao) as ultima_medicao
FROM frigorifico f
INNER JOIN salas_frias sf ON f.id = sf.fkfrigo
LEFT JOIN sensor s ON s.fkSala = sf.id
LEFT JOIN dados d ON d.fksensor = s.id
WHERE f.fkempresa = ${fkEmpresa}
GROUP BY sf.fkfrigo, f.nomeFrigo, sf.id, sf.nomeSala
ORDER BY 
    CASE 
        WHEN Status_alerta = 'Crítico' THEN 1
        WHEN Status_alerta = 'Alerta' THEN 2
        WHEN Status_alerta = 'Sem Dados' THEN 3
        ELSE 4
    END,
    sf.id;

    `
    instrucaoAntiga = `
        SELECT 
    f.id as idFrigo,
    sf.fkfrigo,
    f.nomeFrigo,
    sf.id as número_sala,
    sf.nomeSala,
    COUNT(s.id) as quantidade_sensores,
    truncate(AVG(d.sensor_analogico), 2) as temperatura_media,
    CASE 
        WHEN AVG(d.sensor_analogico) > 4.0 THEN 'Crítico'
        WHEN AVG(d.sensor_analogico) < -3.0 THEN 'Crítico'
        WHEN AVG(d.sensor_analogico) = -3.0 THEN 'Alerta'
        WHEN AVG(d.sensor_analogico) = 4.0 THEN 'Alerta'
        ELSE 'Ideal'
    END as Status_alerta,
    MAX(d.data_medicao) as ultima_medicao
FROM frigorifico f
INNER JOIN salas_frias sf ON f.id = sf.fkfrigo
INNER JOIN sensor s ON s.fkSala = sf.id
INNER JOIN dados d ON d.fksensor = s.id
WHERE f.fkempresa = ${fkEmpresa}
GROUP BY sf.fkfrigo, f.nomeFrigo, sf.id, sf.nomeSala
ORDER BY 
    CASE 
        WHEN Status_alerta = 'Crítico' THEN 1
        WHEN Status_alerta = 'Alerta' THEN 2
        ELSE 3
    END,
    sf.id;
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
function mostrarTotaisSalasFrigorificoEspecifico(idEmpresa, nomeFrigo) {
    intrucao =
        `
        select 
        count(sf.id)
        from empresa e
        inner join frigorifico f on f.fkempresa = e.id
        inner join salas_frias sf on sf.fkfrigo = f.id
        where e.id = ${idEmpresa} and f.nomeFrigo = '${nomeFrigo}';
    `;
    console.log(instrucao);
    return database.executar(instrucao);
}





module.exports = {
    listarSalasTotais,
    KPItotal_frigo,
    KPItotal_salas,
    KPIsalas_ideal,
    KPIsalas_naoIdeal,
    KPIfrigoGeral,
    
};



