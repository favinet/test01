var express = require("express");
var router = express.Router();
const { go } = require("./stress-bc");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express1--ta!!!!!!!" });
});

router.get("/stress", async function (req, res, next) {
  let result = await go();
  var ret = { result: 1, error: "", data: result };
  res.send(ret);
});

module.exports = router;
