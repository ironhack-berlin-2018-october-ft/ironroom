const express = require("express");
const { isConnected, redirectToNextRoom } = require("../middlewares");
const rooms = require("../data/rooms");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect(rooms[req.user.roomIndex].url);
});

router.get("/0", (req, res, next) => {
  res.render("rooms/1");
});

router.get("/1", (req, res, next) => {
  res.render("rooms/1");
});

router.get("/2", (req, res, next) => {
  res.render("rooms/2");
});

router.get("/gadget", (req, res, next) => {
  res.render("rooms/gadget");
});

router.get("/chartreuse", (req, res, next) => {
  res.render("rooms/chartreuse");
});

router.get("/bridgeoftruth", (req, res, next) => {
  res.render("rooms/bridgeoftruth");
});
router.get("/whatadrag", (req, res, next) => {
  res.render("rooms/whatadrag");
});

router.post("/bridgeoftruth", (req, res, next) => {
  let answer = "==";
  let { truth } = req.body;
  if (answer == truth) {
    // redirectToNextRoom(req, res, next);
    res.render("success");
  } else {
    res.render("rooms/bridgeoftruth");
  }
});

router.post("/chartreuse", (req, res, next) => {
  let color = (req.body.color + "").toLowerCase();
  if (color !== "7fff00") res.render("rooms/chartreuse");
  else {
    redirectToNextRoom(req, res, next);
  }
});

router.get("/hex-color", (req, res, next) => {
  res.render("rooms/hex-color");
});

router.post("/hex-color", (req, res, next) => {
  let fruit = (req.body.fruit + "").toLowerCase();
  if (fruit !== "banana") res.render("rooms/hex-color");
  else {
    redirectToNextRoom(req, res, next);
  }
});

module.exports = router;
