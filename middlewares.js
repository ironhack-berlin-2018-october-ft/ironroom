const Team = require('./models/Team')
const rooms = require('./data/rooms')
const { gameDuration } = require('./data/constants')

module.exports = {
  isConnected: function (req, res, next) {
    if (req.user) next()
    else res.redirect('/join')
  },
  redirectToNextRoom: function (req, res, next) {
    let url = req.originalUrl
    if (url.includes('?')) {
      url = url.substr(0, url.indexOf('?'))
    }
    const curRoomIndex = rooms.findIndex(room => room.url === url)
    console.log('DEBUG curRoomIndex', curRoomIndex);
    console.log('DEBUG url', url);
    if (curRoomIndex < rooms.length - 1) {
      res.redirect(rooms[curRoomIndex + 1].url)
    }
    else {
      Team.findByIdAndUpdate(req.user._id, { roomIndex: rooms.length, enteredAt: Date.now() })
        .then(team => res.redirect('/success'))

    }
  },
  roomsMiddleware: function (req, res, next) {
    if (!req.user) {
      res.redirect('/join')
      return
    }

    let startingAtTime = req.user.startingAt.getTime() / 1000
    let currentTime = (new Date).getTime() / 1000

    if (currentTime - startingAtTime > gameDuration) {
      console.log("OVER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      req.logout()
      res.redirect('/game-over')
    }

    res.locals.isRoomLayout = true

    const curRoomIndex = rooms.findIndex(room => room.url === req.originalUrl)
    if (curRoomIndex <= req.user.roomIndex) next()
    else {
      Team.findByIdAndUpdate(req.user._id, { roomIndex: curRoomIndex, enteredAt: Date.now() })
        .then(team => next())
    }
  },
};
