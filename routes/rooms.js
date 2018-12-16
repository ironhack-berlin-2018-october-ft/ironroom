const express = require('express');
const { isConnected, redirectToNextRoom } = require('../middlewares')

const router = express.Router();

router.get('/1', isConnected, (req, res, next) => {
  res.render('rooms/1', { layout: 'roomsLayout' });
});

router.get('/2', isConnected, (req, res, next) => {
  res.render('rooms/2', { layout: 'roomsLayout' });
});

router.get('/chartreuse', isConnected, (req, res, next) => {
  res.render('rooms/chartreuse', { layout: 'roomsLayout' });
});

router.post('/chartreuse', isConnected, (req, res, next) => {
  let color = (req.body.color + "").toLowerCase()
  if (color !== '7fff00')
    res.render('rooms/chartreuse', { layout: 'roomsLayout' });
  else {
    redirectToNextRoom(req, res, next)
  }
});


module.exports = router;
