const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load user model
const User = require("../../models/User");
// @route  GET api/users/test
// @desc   Test User router
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Work" }));

// @route  GET api/users/test
// @desc   Test UserRegister router
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: user.email + "email alredy exits" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //mm
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc   Test Login router
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //   Find the user
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "user email not found" });
    }

    // chack password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              expiresIn: 3600,
              payload: payload
            });
          }
        );
      } else {
        return res.status(404).json({ password: "not mached" });
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Test Login router
// @access Pravite
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    });
  }
);
module.exports = router;
