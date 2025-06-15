var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarSalasTotais/:idEmpresa", function (req, res) {
    dashboardController.listarSalasTotais(req, res);
});


router.get("/KPItotal_frigo/:idEmpresa", function (req, res) {
    dashboardController.KPItotal_frigo(req, res);
});


router.get("/KPItotal_salas/:idEmpresa", function (req, res) {
    dashboardController.KPItotal_salas(req, res);
});


router.get("/KPIsalas_ideal/:idEmpresa", function (req, res) {
    dashboardController.KPIsalas_ideal(req, res);
});


router.get("/KPIsalas_naoIdeal/:idEmpresa", function (req, res) {
    dashboardController.KPIsalas_naoIdeal(req, res);
});


router.get("/KPIfrigoGeral/:idEmpresa", function (req, res) {
    dashboardController.KPIfrigoGeral(req, res);
});


module.exports = router;