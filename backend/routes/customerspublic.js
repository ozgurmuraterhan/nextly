const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
let Users = require("../models/users.model");

const title = "User";
const roleTitle = "customers";

router.post('/updatePasswordCustomer', passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role;
      if (rolesControl['customers/id'] || req.body._id == req.user._id) {
         Users.findOne({
            $and: [
               { _id: req.body._id },
               { isCustomer: true }
            ]
         }
         ).then((users) => {
            if (users != null) {
               console.log('user exists in db');
               bcrypt
                  .hash(req.body.password, BCRYPT_SALT_ROUNDS)
                  .then((hashedPassword) => {
                     Users.findOneAndUpdate(
                        {
                           _id: req.body._id,
                        },
                        {
                           password: hashedPassword,
                        }
                     )
                        .then(() => {
                           res.json({
                              messagge: title + ' Password Update',
                              variant: 'success',
                           });
                        })
                        .catch((err) => {
                           console.log(err);
                           res.json({
                              messagge: 'Error: ' + err,
                              variant: 'error',
                           });
                        });
                  });
            } else {
               console.error('no user exists in db to update');
               res.status(401).json('no user exists in db to update');
            }
         });
      } else {
         res.json({
            messagge: ' You are not authorized, go away!',
            variant: 'error',
         });
      }
   });
}
);

// add address  
router.route("/address").post(passport.authenticate('jwt', { session: false }), (req, res) => {
   Users.findOneAndUpdate(
      { username: req.user.username },
      { $set: { address: req.body }, },
   )
      .then((data) => {
         res.json(data.address);
      })
      .catch((err) =>
         res.json({
            messagge: "Error:( " + err,
            variant: "error",
         })
      );

});





module.exports = router;