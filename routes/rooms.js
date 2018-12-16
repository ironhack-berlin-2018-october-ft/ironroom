const express = require('express');
const { isConnected } = require('../middlewares')

const router = express.Router();

router.get('/1', isConnected, (req, res, next) => {
  res.render('rooms/1', { layout: 'roomsLayout' });
});

router.get('/2', isConnected, (req, res, next) => {
  res.render('rooms/2', { layout: 'roomsLayout' });
});

router.get('/chocolate', isConnected, (req, res, next) => {
  res.render('rooms/chocolate', { layout: 'roomsLayout' });
});

router.post('/chocolate', isConnected, (req, res, next) => {
  let { color } = req.body
  if (color !== '7B3F00')
    res.render('rooms/chocolate', { layout: 'roomsLayout' });
  else {
    res.redirect('/rooms/wip', { layout: 'roomsLayout' });
  }
});


module.exports = router;
