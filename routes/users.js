var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

/* GET users listing. */

// définiton de la route SIGN-UP.
router.post('/sign-up', async function (req, res, next) {
  var userData = await userModel.find();
  console.log(userData)
  
  emailalreadyregistered = false;

	var emailtest = req.body.email;

	for (var i = 0; i < userData.length; i++) {
		if (userData[i].email === emailtest) {
			emailalreadyregistered = true;
		}

		if (emailalreadyregistered === true) {
      res.redirect('/login');
		} else {
			var newUser = new userModel({
        name: req.body.name,
        firstname: req.body.firstname,
				email: req.body.email,
				password: req.body.password,
			});

			// pour les sauvegarder le nouvel utilisateur en base de données.
      var newUserSave = await newUser.save();
      console.log(newUserSave)

			// stockez le nom et l’ID en session
			req.session.user = { name: newUserSave.username, id: newUserSave._id };
		}
  }
  res.redirect('/homepage');
});


// Definition de la route sign-up
router.post('/sign-in', async function (req, res, next) {
	var userData = await userModel.find();

	// Tester si l'utilisateur recherché est déjà enregistré
	let notRegistered = true;

	let emailtest = req.body.email.toLowerCase();

	for (var i = 0; i < userData.length; i++) {
		if (userData[i].email.toLowerCase() === emailtest) {
			notRegistered = false;
		}
	}
	if (notRegistered === false) {
		// stockez le nom et l’ID en session
		req.session.user = { name: req.body.username, id: req.body._id };
		res.redirect('/homepage');
	} else {
		res.redirect('/');
	}
});


router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/')
})


module.exports = router;
