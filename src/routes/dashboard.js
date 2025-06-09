var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarFrigorifico/:idEmpresa", function (req, res) {
    dashboardController.listarFrigorificos(req, res);
});

router.get("/KPIdash/:idEmpresa/:idFrigorifico", function (req, res) {
    dashboardController.KPIdash(req, res);
});

router.get("/KPIfrigoGeral/:idEmpresa/:idFrigorifico", function (req, res) {
    dashboardController.KPIfrigoGeral(req, res);
});


module.exports = router;