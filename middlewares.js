const Team = require('./models/Team')
const rooms = require('./data/rooms')

module.exports = {
  isConnected: function (req, res, next) {
    if (req.user) next()
    else res.redirect('/join')
  },
  redirectToNextRoom: function (req, res, next) {
    const curRoomIndex = rooms.findIndex(room => room.url === req.originalUrl)
    if (curRoomIndex < rooms.length - 1) {
      res.redirect(rooms[curRoomIndex + 1].url)
    }
    else {
      res.redirect('/success')
    }
  },
  roomsMiddleware: function (req, res, next) {
    if (!req.user) {
      res.redirect('/join')
      return
    }

    res.locals.layout = 'roomsLayout'

    const curRoomIndex = rooms.findIndex(room => room.url === req.originalUrl)
    if (curRoomIndex <= req.user.roomIndex) next()
    else {
      Team.findByIdAndUpdate(req.user._id, { roomIndex: curRoomIndex })
        .then(team => next())
    }
  },
};
