const express = require('express');
const router = express.Router();
const Team = require('../models/Team.js')
const { isConnected } = require('../middlewares')
const roomsArr = require("../data/rooms")
const getJohnReply = require("../data/john")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
})

router.get("/high-scores", (req, res, next) => {
  Team.find({}, "name participants roomIndex startingAt enteredAt").lean()
    .then(teams => {
      console.log('DEBUG ', teams[0].enteredAt);
      console.log('DEBUG ', teams[0].startingAt);
      res.render("high-scores", {
        teams,
        bestTeamsGlobal: teams
          .map(t => ({ ...t, time: (t.enteredAt - t.startingAt) }))
          .sort((a, b) => b.roomIndex - a.roomIndex)
          .slice(0, 5),
        bestTeamsOfToday: teams
          .filter(team => team.startingAt.toISOString().substr(0, 10) === new Date().toISOString().substr(0, 10))
          // .map(t => ({ ...t, time: t.getTime() / (1000) }))
          .map(t => ({ ...t, time: (t.enteredAt - t.startingAt) }))
          .sort((a, b) => (b.roomIndex - a.roomIndex) * 10 ** 9 + a.time - b.time)
          .slice(0, 5),
      })
    })
})


router.get('/chat', isConnected, (req, res, next) => {
  const team = req.user

  // FIXME: move this to logic on the model instead of here in the controller
  let hintToPush = roomsArr[team.roomIndex].hints.find((h) => {
    return (new Date(team.enteredAt).getTime() + (h.timeInMin * 60 * 1000)) < Date.now() && !team.messages.map(m => m.text).includes(h.text)
  })

  if (hintToPush) {
    team.messages.push({ isFromTeam: false, text: hintToPush.text, roomIndex: team.roomIndex })
  }
  team.save().then(() => {
    res.render('chat', { layout: false, messages: team.messages, teamname: team.name });
  })
})

router.post('/chat', isConnected, (req, res, next) => {
  Team.findByIdAndUpdate(req.user.id, { $push: { messages: { isFromTeam: true, text: req.body.input, roomIndex: req.user.roomIndex } } }, { new: true }).then((team) => {
    // slice creates a copy so the messages pushed later are noe rendered as well.
    res.render('chat', { layout: false, messages: team.messages.slice(), teamname: team.name });
    // also enter John's response ( will be fetched at next 5 sec interval )

    if (team.roomIndex > 1) {
      team.messages.push({
        isFromTeam: false,
        text: getJohnReply(team.messages[team.messages.length - 1].text),
        roomIndex: team.roomIndex
      })
      team.save()
    }
  })
})

router.get('/game-over', (req, res, next) => {
  res.render('game-over')
})

router.get('/success', (req, res, next) => {
  res.render('success')
})

module.exports = router;
