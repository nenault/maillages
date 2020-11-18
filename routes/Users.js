var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    const apiRes = await User.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await User.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updatedUser = req.body;
    const apiRes = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
    });
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const apiRes = await User.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
