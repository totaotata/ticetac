var express = require("express");
var router = express.Router();
var HistoryModel = require("../models/histories");

// ici route qui vient du panier, récuperer les informations des voyages, 

router.get("/", function (req, res, next) {
  res.render("last-trip");
});

// router.get("/", async function (req, res, next) {

//   var from = req.query.from;
//   var to = req.query.to;
//   var date = new Date(req.query.date);
//   var depT = req.query.depT
//   var price = req.query.price

//   var id = req.session.user.id

// var newHistory = new HistoryModel ({
//   journeys: {
//     departure: from,
//     arrival: to,
//     date: date,
//     departureTime: depT,
//     price: price
//     },
//   users: req.session.user.id
// });
// var history = await newHistory.save()

//   history = await HistoryModel.findById(users).populate('journeys').exec();

//   if (history == "") {
//     historyisEmpty = true;
//   } else {
//     historyisEmpty = false;
//   }
//   res.render("last-trip", { title: "Last trip" },history, historyisEmpty);
// });

module.exports = router;
