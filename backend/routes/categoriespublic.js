const router = require("express").Router();
const passport = require("passport");
let Categories = require("../models/categories.model");
let Users = require("../models/users.model");

const title = "Categories";
const roleTitle = "categories";




// get all items
router.route("/:id").get((req, res, next) => {
    if (req.params.id == "not") {
        Categories.find()
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
        Categories.find({ isActive: req.params.id })
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
