var express = require("express");
var router = express.Router();
var HistoryModel = require("../models/histories");


router.post("/", async function (req, res, next) {

console.log(req.session.panier);
// var panier = JSON.parse(req.body.panier);


  var from = panier.departure;
  var to = panier.arrival;
  var date = new Date(panier.date);
  var depT = panier.departureTime
  var price = panier.price



var newHistory = new HistoryModel ({
  journeys: {
    departure: from,
    arrival: to,
    date: date,
    departureTime: depT,
    price: price
    },
  users: req.session.id
});
var history = await newHistory.save()

res.redirect("homepage")
});


// route navbar last-trip
router.get("/last-trip", async function (req, res, next) {

  var history = await HistoryModel.findOne(
     { users: req.session.id}
  );

  if (history == "") {
    historyisEmpty = true;
  } else {
    historyisEmpty = false;
  }

  res.redirect("last-trip", { title: "Last trip"}, history, historyisEmpty)
});


module.exports = router;
