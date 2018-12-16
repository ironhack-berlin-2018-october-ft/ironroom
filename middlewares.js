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
    res.locals.layout = 'roomsLayout'
    next()
  },
};
