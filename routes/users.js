var express = require("express");
var router = express.Router();
var userModel = require("../models/users");

/* GET users listing. */

// définiton de la route SIGN-UP.
router.post("/sign-up", async function (req, res, next) {
  var isUserExist = await userModel.findOne({
    email: req.body.email,
  });
  console.log(isUserExist);
  if (isUserExist == null) {
    var newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    var user = await newUser.save();
    req.session.username = user.username;
    req.session.id = user.id;

    res.redirect("/homepage");
  } else {
    res.redirect("/");
  }

  //   var userData = await userModel.find();
  //   console.log(userData);

  //   emailalreadyregistered = false;

  //   var emailtest = req.body.email;

  //   for (var i = 0; i < userData.length; i++) {
  //     if (userData[i].email === emailtest) {
  //       emailalreadyregistered = true;
  //     }

  //     if (emailalreadyregistered === true) {
  //       res.redirect("/login");
  //     } else {
  //       var newUser = new userModel({
  //         name: req.body.name,
  //         firstname: req.body.firstname,
  //         email: req.body.email,
  //         password: req.body.password,
  //       });

  //       // pour les sauvegarder le nouvel utilisateur en base de données.
  //       var newUserSave = await newUser.save();
  //       console.log(newUserSave);

  //       // stockez le nom et l’ID en session
  //       req.session.name = newUserSave.name;
  //       req.session.id = newUserSave.id;
  //       console.log(req.session.id);
  //     }
  //   }
  //   res.redirect("/homepage");
});

// Definition de la route sign-up

router.post("/sign-in", async function (req, res, next) {
  var user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);
  if (user != null) {
    res.redirect("/homepage");
  } else {
    res.render("login");
  }
});

//   var userData = await userModel.find();
//   console.log(userData);
//   // Tester si l'utilisateur recherché est déjà enregistré
//   let notRegistered = true;
//   let emailtest = req.body.email.toLowerCase();
//   for (var i = 0; i < userData.length; i++) {
//     if (userData[i].email.toLowerCase() === emailtest) {
//       notRegistered = false;
//       console.log(notRegistered);
//     }
//   }
//   if (notRegistered === false) {
//     // stockez le nom et l’ID en session
//     console.log("Stocké session");
//     req.session.username = req.body.username;
//     req.session.id = req.body.id;
//     console.log(req.session.id);
//     // req.session = { name: req.body.username, id: req.body._id };
//     res.redirect("/homepage");
//   } else {
//     res.redirect("/");
//   }

router.get("/logout", function (req, res, next) {
  req.session.name = "";
  req.session.id = "";

  res.redirect("/");
});

module.exports = router;
