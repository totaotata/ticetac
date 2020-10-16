var express = require("express");
var router = express.Router();
var HistoryModel = require("../models/histories");

router.get("/", function (req, res, next) {
  res.render("last-trip", { title: "Last trip" });
});
module.exports = router;
