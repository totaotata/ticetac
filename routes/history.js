var express = require("express");
var router = express.Router();
var HistoryModel = require("../models/histories");

router.post("/", async function (req, res, next) {
  req.session.panier = JSON.parse(req.body.panier);
  console.log(req.session.id);
  panier = req.session.panier;
  // console.log(panier[0].date);

  // var from = panier.departure;
  // var to = panier.arrival;
  // var date = panier.date;
  // var depT = panier.departureTime;
  // var price = panier.price;
  var newHistory = new HistoryModel({
    journeys: [
      {
        departure: panier[0].departure,
        arrival: panier[0].arrival,
        date: panier[0].date,
        departureTime: panier[0].departureTime,
        price: panier[0].price,
      },
    ],
    users: req.session.id,
  });
  var history = await newHistory.save();
  // for (let i = 0; i < panier.length; i++) {

  // }
  // console.log(history);
  res.redirect("homepage");
});

// route navbar last-trip
router.get("/last-trip", async function (req, res, next) {
  var history = await HistoryModel.findOne({
    users: "Mq0M5Bth2Mn7dzKP-F4hOfUUnqv4nyIY",
  });

  if (history == "") {
    historyisEmpty = true;
  } else {
    historyisEmpty = false;
  }
  console.log(history.journeys.length);
  console.log(historyisEmpty);
  res.render("last-trip", { history: history.journeys, historyisEmpty });
});

module.exports = router;
