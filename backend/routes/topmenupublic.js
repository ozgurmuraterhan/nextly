const router = require("express").Router();
const passport = require("passport");
let Topmenu = require("../models/topmenu.model");
let Users = require("../models/users.model");

const title = "Top Menu";
const roleTitle = "topmenu";




// get all items
router.route("/:id").get((req, res, next) => {
    if (req.params.id == "not") {
        Topmenu.find({}, { title: 1, order: 1, seo: 1, categories_id: 1, _id: 1, isActive: 1 }).sort({ order: 1 })
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
        Topmenu.find({ seo: req.params.id }, {}).sort({ order: 1 })
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
