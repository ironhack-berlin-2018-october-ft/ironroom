const express = require('express');
const { isConnected } = require('../middlewares')

const router = express.Router();

router.get('/1', isConnected, (req, res, next) => {
  res.render('rooms/1');
});

router.get('/2', isConnected, (req, res, next) => {
  res.render('rooms/2');
});

module.exports = router;
