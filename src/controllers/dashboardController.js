var dashboardModel = require("../models/dashboardModel");

function listarPorFrigorifico(req, res) {
    console.log("Entrei na controller listarPorFrigorifico")
    var idFrigorifico = req.params.idFrigorifico;
    var idEmpresa = req.params.idEmpresa;
    dashboardModel.listarPorFrigorifico(idFrigorifico,idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}
module.exports = {
    listarPorFrigorifico
}