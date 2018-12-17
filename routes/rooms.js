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

router.post("/chartreuse", (req, res, next) => {
  let color = (req.body.color + "").toLowerCase();
  if (color !== "7fff00") res.render("rooms/chartreuse");
  else {
    redirectToNextRoom(req, res, next);
  }
});

router.get("/consoling", (req, res, next) => {
  res.render("rooms/consoling");
});

router.post("/consoling", (req, res, next) => {
  if (
    req.body.console1 === "checked" &&
    req.body.console3 === "checked" &&
    req.body.console7 === "checked"
  ) {
    redirectToNextRoom(req, res, next);
  }
  res.render("rooms/consoling");
});

module.exports = router;
