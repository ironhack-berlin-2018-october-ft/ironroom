const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/game-over', (req, res, next) => {
  res.render('game-over')
})

module.exports = router;
