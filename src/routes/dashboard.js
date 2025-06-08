var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarFrigorifico/:idEmpresa", function (req, res) {
    dashboardController.listarFrigorificos(req, res);
});
router.get("/filtroFrigorifico/:idEmpresa/:idFrigorifico", function (req, res) {
    dashboardController.filtroFrigorifico(req, res);
});

module.exports = router;