var dashboardModel = require("../models/dashboardModel");

function listarPorFrigorifico(req, res) {
    console.log("Entrei na controller listarPorFrigorifico")
    var idFrigorifico = req.params.idFrigorifico;
    dashboardModel.listarPorFrigorifico(idFrigorifico).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}
module.exports = {
    listarPorFrigorifico
}