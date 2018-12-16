const express = require('express');
const router = express.Router();
const Team = require('../models/Team.js')
const { isConnected } = require('../middlewares')
const roomsArr = require("../data/rooms")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/chat', isConnected, (req, res, next) => {
  Team.findById(req.user.id).then((doc) => {

    // FIXME: move this to logic on the model instead of here in the controller
    roomsArr[doc.roomNb].hints.filter((h) => {
      return (new Date(doc.enteredAt).getTime() + (h.timeInMin * 60 * 1000)) < Date.now()
    }).forEach((h) => {
      // FIXME: this should be moved someplace else to check which message should be pushed
      if (!doc.messages.map(m => m.text).includes(h.text)) {
        doc.messages.push({ isFromTeam: false, text: h.text })
      }
    })
    doc.save().then(() => {
      res.render('chat', { layout: false, messages: doc.messages, teamname: doc.name });
    })
  })
})

router.post('/chat', isConnected, (req, res, next) => {
  Team.findByIdAndUpdate(req.user.id, { $push: { messages: { isFromTeam: true, text: req.body.input } } }, { new: true }).then((doc) => {
    // slice creates a copy so the messages pushed later are noe rendered as well.
    res.render('chat', { layout: false, messages: doc.messages.slice(), teamname: doc.name });
    // also enter John's response ( will be fetched at next 5 sec interval )
    doc.messages.push({ isFromTeam: false, text: 'please, focus on helping me out here not just texting something !' })
    doc.save()
  })
})

router.get('/game-over', (req, res, next) => {
  res.render('game-over')
})

router.get('/success', (req, res, next) => {
  res.render('success')
})

module.exports = router;
