var express = require("express");
var router = express.Router();
const Call = require("../models/Call");

router.get("/", async (req, res, next) => {
  try {
    const apiRes = await Call.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Call.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCall = req.body;
    const apiRes = await Call.create(newCall);
    res.status(201).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updatedCall = req.body;
    const apiRes = await Call.findByIdAndUpdate(req.params.id, updatedCall, {
      new: true,
    });
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const apiRes = await Call.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
