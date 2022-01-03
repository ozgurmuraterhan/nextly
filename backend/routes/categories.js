const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
let Categories = require("../models/categories.model");
let Users = require("../models/users.model");

const title = "Categories";
const roleTitle = "categories";




// get all items
router.route("/").get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].role;
        if (rolesControl[roleTitle + "/list"]) {
            Categories.find().sort({ order: 1 })
                .then((data) => {
                    res.json(data);
                })
                .catch((err) =>
                    res.json({
                        messagge: "Error: " + err,
                        variant: "error",
                    })
                );
        } else if (rolesControl[roleTitle + "onlyyou"]) {
            Categories.find({
                "created_user.id": `${req.user._id}`,
            })
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
                    messagge: "You are not authorized, go away!",
                    variant: "error",
                },
            });
        }
    });
});

router.route("/counts/").get(passport.authenticate("jwt", { session: false }), (req, res, next) => {

    Categories
        .countDocuments()
        .then((data) => res.json(data))
        .catch((err) =>
            res.status(400).json({
                messagge: "Error: " + err,
                variant: "error",
            })
        );

});

// post new items
router.route("/add").post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].role;
        if (rolesControl[roleTitle + "/add"]) {
            new Categories(req.body)
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
                    messagge: "You are not authorized, go away!",
                    variant: "error",
                },
            });
        }
    });
});


// fetch data by id
router.route("/:id").get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].role;
        if (rolesControl[roleTitle + "/list"]) {
            Categories.findById(req.params.id)
                .then((data) => res.json(data))
                .catch((err) =>
                    res.status(400).json({
                        messagge: "Error: " + err,
                        variant: "error",
                    })
                );
        } else if (rolesControl[roleTitle + "onlyyou"]) {
            Categories.findOne({
                _id: req.params.id,
                "created_user.id": `${req.user._id}`,
            })
                .then((data) => {
                    if (data) {
                        res.json(data);
                    } else {
                        res.status(403).json({
                            message: {
                                messagge: "You are not authorized, go away!",
                                variant: "error",
                            },
                        });
                    }
                })
                .catch((err) =>
                    res.status(400).json({
                        messagge: "Error: " + err,
                        variant: "error",
                    })
                );
        } else {
            res.status(403).json({
                message: {
                    messagge: "You are not authorized, go away!",
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
            Categories.findByIdAndDelete(req.params.id)
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
        } else if (rolesControl[roleTitle + "onlyyou"]) {
            Categories.deleteOne({
                _id: req.params.id,
                "created_user.id": `${req.user._id}`,
            })
                .then((resdata) => {
                    if (resdata.deletedCount > 0) {
                        res.json({
                            messagge: title + " delete",
                            variant: "success",
                        });
                    } else {
                        res.status(403).json({
                            message: {
                                messagge: "You are not authorized, go away!",
                                variant: "error",
                            },
                        });
                    }
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
                    messagge: "You are not authorized, go away!",
                    variant: "error",
                },
            });
        }
    });
});

// update data by id
router.route("/:id").post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    Users.find({ username: req.user.username }).then((data) => {
        const rolesControl = data[0].role;
        if (rolesControl[roleTitle + "/id"]) {
            Categories.findByIdAndUpdate(req.params.id, req.body)
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
        } else if (rolesControl[roleTitle + "onlyyou"]) {
            Categories.findOneAndUpdate(
                {
                    _id: req.params.id,
                    "created_user.id": `${req.user._id}`,
                },
                req.body
            )
                .then((resdata) => {
                    if (resdata) {
                        res.json({
                            messagge: title + " Update",
                            variant: "success",
                        });
                    } else {
                        res.json({
                            messagge: " You are not authorized, go away!",
                            variant: "error",
                        });
                    }
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
                    messagge: "You are not authorized, go away!",
                    variant: "error",
                },
            });
        }
    });
});

module.exports = router;
