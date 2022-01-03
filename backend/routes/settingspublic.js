const router = require("express").Router();
const passport = require("passport");
let Settings = require("../models/settings.model");
let Users = require("../models/users.model");

const title = "Settings";

// get all items
router.route("/").get((req, res, next) => {

   Settings.find()
      .then((data) => {
         res.json(data[0]);
      })
      .catch((err) =>
         res.json({
            messagge: "Error: " + err,
            variant: "error",
         })
      );

});

module.exports = router;
