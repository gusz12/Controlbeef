var express = require("express");
var router = express.Router();

var frigorificoController = require("../controllers/frigorificoController");

router.get("/totalSalasFrigo/:idEmpresa/:idFrigo", function (req, res) {
    frigorificoController.totalSalasFrigo(req, res);
});

router.get("/totalSalasIdealFrigo/:idEmpresa/:idFrigo", function (req, res) {
    frigorificoController.totalSalasIdealFrigo(req, res);
});

router.get("/totalSalasNIdealFrigo/:idEmpresa/:idFrigo", function (req, res) {
    frigorificoController.totalSalasNIdealFrigo(req, res);
});

router.get("/listarSalas/:idEmpresa/:idFrigorifico", function (req, res) {
    frigorificoController.listarSalas(req, res);
});

router.get("/dadosSala/:idSala", function (req, res) {
    frigorificoController.dadosSala(req, res);
});

router.get("/criarGrafico/:idSala", function (req, res) {
    frigorificoController.criarGrafico(req, res);
});

router.get("/tempoForaIdealSala/:idEmpresa/:idFrigorifico/:idSala", function (req, res) {
    frigorificoController.tempoForaIdealSala(req, res);
});

router.get("/KpiTempAtual/:idEmpresa/:idFrigorifico/:idSala", function (req, res) {
    frigorificoController.KpiTempAtual(req, res);
});


router.get("/avisoSalas/:idEmpresa/:idFrigorifico", function (req, res) {
    frigorificoController.avisoSalas(req, res);
});






module.exports = router;