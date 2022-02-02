const router = require("express").Router();
let Cargoes = require("../models/cargoes.model");

const title = "Cargoes";
const roleTitle = "cargoes";

// get all items
router.route("/").get((req, res, next) => {
    Cargoes.find({ isActive: true }, { title: 1, categories_id: 1, order: 1, _id: 1 }).sort({ order: 1 })
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
