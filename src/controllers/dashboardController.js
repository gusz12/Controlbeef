var dashboardModel = require("../models/dashboardModel");

function listarFrigorificos(req, res) {
    console.log("Entrei na controller listarPorFrigorifico")

    var idEmpresa = req.params.idEmpresa;

    dashboardModel.listarFrigorificos(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}



function KPItotal_frigo(req, res) {
    console.log("Entrei na controller KPItotal_frigo")

    var idEmpresa = req.params.idEmpresa;

    dashboardModel.KPItotal_frigo(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}



function KPItotal_salas(req, res) {
    console.log("Entrei na controller KPIKPItotal_salasdash")

    var idEmpresa = req.params.idEmpresa;

    dashboardModel.KPItotal_salas(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function KPIsalas_ideal(req, res) {
    console.log("Entrei na controller KPIsalas_ideal")

    var idEmpresa = req.params.idEmpresa;

    dashboardModel.KPIsalas_ideal(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function KPIsalas_naoIdeal(req, res) {
    console.log("Entrei na controller KPIsalas_naoIdeal")

    var idEmpresa = req.params.idEmpresa;

    dashboardModel.KPIsalas_naoIdeal(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}


function KPIfrigoGeral(req, res) {
    console.log("Entrei na controller KPIfrigoGeral")

    var idEmpresa = req.params.idEmpresa;
    var idFrigorifico = req.params.idFrigorifico

    dashboardModel.KPIfrigoGeral(idEmpresa, idFrigorifico).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}







module.exports = {
    listarFrigorificos,
    KPItotal_frigo,
    KPItotal_salas,
    KPIsalas_ideal,
    KPIsalas_naoIdeal,
    KPIfrigoGeral
}