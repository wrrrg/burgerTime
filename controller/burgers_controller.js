var express = require("express"),
    burger = require("../models/burger.js");

var router = express.Router();

// here there be routes and stuff
// get route to display all burgers
router.get("/", function(req, res){
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// post route to make a new burger
router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name"
  ], [
    req.body.name
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

// put to update burgers
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition: " + condition);
// the only real update I guess should be the boolean devoured or not
  burger.update ({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// I don't think we need this since we leave all burgers in the DB, but it can't hurt I guess to be able to remove them if need be. Might comment this one out.
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// this is going back to server.js to use as a a router. 
module.exports = router;
