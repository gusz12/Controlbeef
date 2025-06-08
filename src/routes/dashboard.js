var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarFrigorifico/:idFrigorifico", function (req,res){
    dashboardController.listarPorFrigorifico(req,res);
});


module.exports = router;