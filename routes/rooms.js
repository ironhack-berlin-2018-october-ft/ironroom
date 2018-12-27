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
});

router.get("/consoling", (req, res, next) => {
  res.render("rooms/consoling");
});

router.post("/consoling", (req, res, next) => {
  console.log(req.body.console2);
  if (
    req.body.console1 === "checked" &&
    req.body.console2 === undefined &&
    req.body.console3 === "checked" &&
    req.body.console4 === undefined &&
    req.body.console5 === undefined &&
    req.body.console6 === undefined &&
    req.body.console7 === "checked"
  ) {
    redirectToNextRoom(req, res, next);
  }
  res.render("rooms/consoling");
});

router.get("/booleans", (req, res, next) => {
  res.render("rooms/booleans");
});

router.post("/booleans", (req, res, next) => {
  let fruit = (req.body.fruit + "").toLowerCase();
  if (fruit !== "banana") res.render("rooms/booleans");
  else {
    redirectToNextRoom(req, res, next);
  }
});
router.get("/banana", (req, res, next) => {
  res.render("rooms/banana");
});

router.post("/banana", (req, res, next) => {
  redirectToNextRoom(req, res, next);
});

router.get("/form", (req, res, next) => {
  res.render("rooms/form");
});

router.post("/form", (req, res, next) => {
  redirectToNextRoom(req, res, next);
});

router.get("/flag", (req, res, next) => {
  res.render("rooms/flag");
})

router.get("/robin", (req, res, next) => {
  res.render("rooms/robin")
})

router.post("/robin", (req, res, next) => {
  let n5 = Number(req.body['5'])
  let n12 = Number(req.body['12'])
  let n17 = Number(req.body['17'])
  let n28 = Number(req.body['28'])
  let n35 = Number(req.body['35'])
  let n41 = Number(req.body['41'])
  let totalArrows = n5 + n12 + n17 + n28 + n35 + n41
  let totalPoints = 5 * n5 + 12 * n12 + 17 * n17 + 28 * n28 + 35 * n35 + 41 * n41
  if (totalArrows === 4 && totalPoints === 87) redirectToNextRoom(req, res, next)
  else res.redirect("/rooms/robin")
})

router.get("/z", (req, res, next) => {
  res.render("rooms/z")
})

router.post("/z", (req, res, next) => {
  let a = Number(req.body['a'])
  let b = Number(req.body['b'])
  let c = Number(req.body['c'])
  let d = Number(req.body['d'])
  let e = Number(req.body['e'])
  let f = Number(req.body['f'])
  let g = Number(req.body['g'])
  if ([a, b, c, d, e, f, g].sort().join('') === '1234567' && a + b + c === c + d + e && e + f + g === c + d + e) {
    redirectToNextRoom(req, res, next)
  }
  else res.redirect("/rooms/z")
})

router.get("/travel", (req, res, next) => {
  res.render("rooms/travel")
})

router.post("/travel", (req, res, next) => {
  if (req.body.secret && req.body.secret.toLowerCase() === 'boat') {
    redirectToNextRoom(req, res, next)
  }
  else res.redirect("/rooms/travel")
})

module.exports = router;
