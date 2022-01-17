const router = require("express").Router();
let Brands = require("../models/brands.model");

const title = "Brands";
const roleTitle = "brands";

// get all items
router.route("/").get((req, res, next) => {
    Brands.find({ isActive: true }).sort({ order: 1 })
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
