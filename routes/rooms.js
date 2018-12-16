const express = require('express');
const { isConnected, redirectToNextRoom } = require('../middlewares')

const router = express.Router();

router.get('/1', isConnected, (req, res, next) => {
  res.render('rooms/1');
});

router.get('/2', isConnected, (req, res, next) => {
  res.render('rooms/2');
});

router.get('/chartreuse', isConnected, (req, res, next) => {
  res.render('rooms/chartreuse');
});

router.post('/chartreuse', isConnected, (req, res, next) => {
  let color = (req.body.color + "").toLowerCase()
  if (color !== '7fff00')
    res.render('rooms/chartreuse');
  else {
    redirectToNextRoom(req, res, next)
    // res.redirect('/rooms/wip')
  }
});


module.exports = router;
