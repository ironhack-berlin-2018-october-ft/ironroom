const passport = require('passport');
const Team = require('../models/Team');

passport.serializeUser((loggedInTeam, cb) => {
  console.log("serializeUser", loggedInTeam)
  cb(null, loggedInTeam._id);
});

passport.deserializeUser((teamIdFromSession, cb) => {
  Team.findById(teamIdFromSession)
    .then(teamDocument => {
      cb(null, teamDocument);
    })
    .catch(err => {
      cb(err);
    })
});
