const express = require("express");
const passport = require('passport');
const router = express.Router();
const Team = require("../models/Team");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/join", (req, res, next) => {
  res.render("auth/join");
});

router.post("/join", (req, res, next) => {
  const name = req.body.name;
  // if (username === "" || password === "") {
  //   res.render("auth/join", { message: "Indicate username and password" });
  //   return;
  // }

  Team.findOne({ name }, "name", (err, team) => {
    if (team !== null) {
      res.render("auth/signup", { message: `The team with the name "${name}" already exists` });
      return;
    }

    const newTeam = new Team({
      name,
    });

    newTeam.save()
      .then(teamDoc => {
        req.login(teamDoc, () => {
          res.redirect("/rooms");
        })
      })
      .catch(err => {
        console.log("err", err)
        res.render("auth/join", { message: "Something went wrong" });
      })
  });
});



// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/auth/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

// router.post("/signup", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   if (username === "" || password === "") {
//     res.render("auth/signup", { message: "Indicate username and password" });
//     return;
//   }

//   Team.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("auth/signup", { message: "The username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newTeam = new Team({
//       username,
//       password: hashPass
//     });

//     newTeam.save()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch(err => {
//       res.render("auth/signup", { message: "Something went wrong" });
//     })
//   });
// });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
