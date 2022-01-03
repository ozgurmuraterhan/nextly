const router = require("express").Router();
const passport = require("passport");
let Basket = require("../models/basket.model");
let Products = require("../models/products.model");
let Users = require("../models/users.model");

const title = "Basket";
const roleTitle = "basket";

// get all items
router.route("/").get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].isActive;
        if (rolesControl) {
            Basket.find()
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
            res.status(403).json({
                message: {
                    messagge: "Your account not active!",
                    variant: "error",
                },
            });
        }
    });
});

// post new items
router.route("/add").post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].isActive;
        if (rolesControl) {
            new Basket(req.body)
                .save()
                .then(() =>
                    res.json({
                        messagge: title + " Added",
                        variant: "success",
                    })
                )
                .catch((err) =>
                    res.json({
                        messagge: " Error: " + err,
                        variant: "error",
                    })
                );
        } else {
            res.status(403).json({
                message: {
                    messagge: "Your account not active!",
                    variant: "error",
                },
            });
        }
    });
});

// all basket items
router.route("/allproducts").post((req, res, next) => {

    Products.find(req.body)
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


// fetch data by id
router.route("/:id").get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].isActive;
        if (rolesControl) {
            Basket.findById(req.params.id)
                .then((data) => res.json(data))
                .catch((err) =>
                    res.status(400).json({
                        messagge: "Error: " + err,
                        variant: "error",
                    })
                );
        } else {
            res.status(403).json({
                message: {
                    messagge: "Your account not active!",
                    variant: "error",
                },
            });
        }
    });
});


// fetch data by id
router.route("/customer/:id").get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].isActive;

        if (rolesControl) {
            Basket.find({ customer_id: req.params.id })
                .then((data) => res.json(data))
                .catch((err) =>
                    res.status(400).json({
                        messagge: "Error: " + err,
                        variant: "error",
                    })
                );
        } else {
            res.status(403).json({
                message: {
                    messagge: "Your account not active!",
                    variant: "error",
                },
            });
        }
    });
});



// delete data by id
router.route("/:id").delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].role;
        if (rolesControl[roleTitle + "delete"]) {
            Basket.findByIdAndDelete(req.params.id)
                .then((data) =>
                    res.json({
                        messagge: title + " Deleted",
                        variant: "info",
                    })
                )
                .catch((err) =>
                    res.json({
                        messagge: "Error: " + err,
                        variant: "error",
                    })
                );
        } else {
            res.status(403).json({
                message: {
                    messagge: "Your account not active!",
                    variant: "error",
                },
            });
        }
    });
});

// update data by id
router.route("/:id").post(passport.authenticate("jwt", { session: false }), (req, res, next) => {


    Users.find({ username: req.user.username }).then((data) => {

        const rolesControl = data[0].isActive;

        if (rolesControl) {
            Basket.findByIdAndUpdate(req.params.id, req.body)
                .then(() =>
                    res.json({
                        messagge: title + " Update",
                        variant: "success",
                    })
                )
                .catch((err) =>
                    res.json({
                        messagge: "Error: " + err,
                        variant: "error",
                    })
                );
        } else {
            res.status(403).json({
                message: {
                    messagge: "Your account not active!",
                    variant: "error",
                },
            });
        }
    });
});

module.exports = router;
