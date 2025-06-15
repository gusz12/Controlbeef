var frigorificoModel = require("../models/frigorificoModel");

function totalSalasFrigo(req, res) {
    console.log("Entrei na controller listarPorFrigorifico")

    var idEmpresa = req.params.idEmpresa;
    var idFrigo = req.params.idFrigo;

    frigorificoModel.totalSalasFrigo(idEmpresa, idFrigo).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}



function totalSalasIdealFrigo(req, res) {
    console.log("Entrei na controller listarPorFrigorifico")

    var idEmpresa = req.params.idEmpresa;
    var idFrigo = req.params.idFrigo;

    frigorificoModel.totalSalasIdealFrigo(idEmpresa, idFrigo).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}



function totalSalasNIdealFrigo(req, res) {
    console.log("Entrei na controller listarPorFrigorifico")

    var idEmpresa = req.params.idEmpresa;
    var idFrigo = req.params.idFrigo;

    frigorificoModel.totalSalasNIdealFrigo(idEmpresa, idFrigo).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function listarSalas(req, res) {
    console.log("Cheguei em listar Salas");
    var idFrigorifico = req.params.idFrigorifico;
    var idEmpresa = req.params.idEmpresa;

    frigorificoModel.listarSalas(idEmpresa, idFrigorifico).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function dadosSala(req, res) {
    console.log("Chegeui no controller dadosSala");
    var idSala = req.params.idSala;
    frigorificoModel.dadosSala(idSala).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function criarGrafico(req, res) {
    console.log("Entrei no controller Criar gráfico");
    var idSala = req.params.idSala;
    frigorificoModel.criarGrafico(idSala).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function KpiTempAtual(req, res) {
    console.log("Entrei no controller KpiTempAtual");
    var idFrigorifico = req.params.idFrigorifico;
    var idEmpresa = req.params.idEmpresa;
    var idSala = req.params.idSala;

    frigorificoModel.KpiTempAtual(idEmpresa, idFrigorifico, idSala).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}


function tempoForaIdealSala(req, res) {
    console.log("Entrei no controller tempoForaIdealSala");
    var idFrigorifico = req.params.idFrigorifico;
    var idEmpresa = req.params.idEmpresa;
    var idSala = req.params.idSala;


    frigorificoModel.tempoForaIdealSala(idEmpresa, idFrigorifico, idSala).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function avisoSalas(req, res) {
    console.log("Entrei no controller avisoSalas");
    var idFrigorifico = req.params.idFrigorifico;
    var idEmpresa = req.params.idEmpresa;



    frigorificoModel.avisoSalas(idEmpresa, idFrigorifico).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
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
}