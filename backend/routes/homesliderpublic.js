const router = require("express").Router();
let Homeslider = require("../models/homeslider.model");

const title = "Home Slider";
const roleTitle = "homeslider";

// get all items
router.route("/").get((req, res, next) => {
    Homeslider.find({ isActive: true }).sort({ order: 1 })
        .then((data) => {
            res.json(data);
        })
        .catch((err) =>
            res.json({
                messagge: "Error: " + err,
                variant: "error",
            })
        );
});

module.exports = router;
