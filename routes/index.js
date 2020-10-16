var express = require("express");
var router = express.Router();

var journeyModel = require("../models/journeys");

var city = [
  "Paris",
  "Marseille",
  "Nantes",
  "Lyon",
  "Rennes",
  "Melun",
  "Bordeaux",
  "Lille",
];
var date = [
  "2018-11-20",
  "2018-11-21",
  "2018-11-22",
  "2018-11-23",
  "2018-11-24",
];
var isEmpty;
var journey;
var journeyPanier = [];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "One Way ticket" });
});

router.get("/homepage", function (req, res, next) {
  console.log(req.session);
  res.render("homepage", { title: "One Way ticket", journey, isEmpty });
});
router.post("/search", async function (req, res, next) {
  var from = req.body.from;
  var to = req.body.to;
  var date = new Date(req.body.date);
  // console.log(date);
  journey = await journeyModel.find({
    departure: capitalizeFirstLetter(from),
    arrival: capitalizeFirstLetter(to),
    date: date,
  });
  console.log(journey);
  if (journey == "") {
    isEmpty = true;
  } else {
    isEmpty = false;
  }
  res.render("search", { title: "One Way ticket", journey, isEmpty });
});

// Remplissage de la base de donnée, une fois suffit
router.get("/save", async function (req, res, next) {
  // How many journeys we want
  var count = 300;

  // Save  ---------------------------------------------------
  for (var i = 0; i < count; i++) {
    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))];
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))];

    if (departureCity != arrivalCity) {
      var newUser = new journeyModel({
        departure: departureCity,
        arrival: arrivalCity,
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });

      await newUser.save();
    }
  }
  res.render("index", { title: "Express" });
});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get("/result", function (req, res, next) {
  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {
    journeyModel.find(
      { departure: city[i] }, //filtre

      function (err, journey) {
        console.log(
          `Nombre de trajets au départ de ${journey[0].departure} : `,
          journey.length
        );
      }
    );
  }

  res.render("index", { title: "Express" });
});

// PANIER

router.get("/panier", function (req, res, next) {
  req.session.train = JSON.parse(req.query.train);
  journeyPanier.push(req.session.train);
  console.log(journeyPanier);
  res.render("panier", { title: "Panier", journeyPanier });
});

module.exports = router;
