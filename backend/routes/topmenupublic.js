const router = require("express").Router();
const passport = require("passport");
let Topmenu = require("../models/topmenu.model");
let Users = require("../models/users.model");

const title = "Top Menu";
const roleTitle = "topmenu";




// get all items
router.route("/:id").get((req, res, next) => {
    if (req.params.id == "not") {
        Topmenu.find().sort({ order: 1 })
            .then((data) => {
                res.json(data);
            })
            .catch((err) =>
                res.json({
                    messagge: "Error: " + err,
                    variant: "error",
                })
            );
    } else {
        Topmenu.find({ isActive: req.params.id }).sort({ order: 1 })
            .then((data) => {
                res.json(data);
            })
            .catch((err) =>
                res.json({
                    messagge: "Error: " + err,
                    variant: "error",
                })
            );
    }
});

module.exports = router;
