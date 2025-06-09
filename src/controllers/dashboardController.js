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


function KPIdash(req, res) {
    console.log("Entrei na controller KPIdash")

    var idEmpresa = req.params.idEmpresa;
    var idFrigorifico = req.params.idFrigorifico

    dashboardModel.KPIdash(idEmpresa, idFrigorifico).then(function (resultado) {
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
    KPIdash,
    KPIfrigoGeral
}