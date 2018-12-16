const express = require('express');
const router = express.Router();
const Team = require('../models/Team.js')
const { isConnected } = require('../middlewares')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/chat', isConnected, (req, res, next) => {
  Team.findById(req.user.id).then((doc) => {
    res.render('chat', { layout: false, messages: doc.messages, teamname: doc.name });
  })
})

router.post('/chat', isConnected, (req, res, next) => {
  Team.findByIdAndUpdate(req.user.id, { $push: { messages: { isFromTeam: true, text: req.body.input } } }, { new: true }).then((doc) => {
    res.render('chat', { layout: false, messages: doc.messages, teamname: doc.name });
  })
})

router.get('/game-over', (req, res, next) => {
  res.render('game-over')
})

module.exports = router;
