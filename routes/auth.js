const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Volunteer = require("../models/Volunteer");

const salt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((userDocument) => {
      if (!userDocument) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = bcrypt.compareSync(
        password,
        userDocument.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      req.session.currentUser = userDocument._id;
      res.redirect("/api/auth/isLoggedIn");
    })
    .catch(next);
});

router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      Volunteer.findOne({ email })
        .then((isVolunteer) => {
          if (isVolunteer) {
            Volunteer.findByIdAndDelete(isVolunteer._id)
              .then((deleteRes) => {
                const hashedPassword = bcrypt.hashSync(password, salt);
                const newUser = { email, password: hashedPassword };

                User.create(newUser)
                  .then((newUserDocument) => {
                    /* Login on signup */
                    req.session.currentUser = newUserDocument._id;
                    res.redirect("/api/auth/isLoggedIn");
                  })
                  .catch(next);
              })
              .catch(next);
          } else {
            return res.status(400).json({ message: "Email not allowed" });
          }
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/isLoggedIn", (req, res, next) => {
  if (!req.session.currentUser)
    return res.status(401).json({ message: "Unauthorized" });

  const id = req.session.currentUser;
  User.findById(id)
    .select("-password")
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

module.exports = router;
