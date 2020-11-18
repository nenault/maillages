var express = require("express");
var router = express.Router();
const Institution = require("../models/Institution");

router.get("/", async (req, res, next) => {
  try {
    const apiRes = await Institution.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Institution.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newInstitution = req.body;
    const apiRes = await Institution.create(newInstitution);
    res.status(201).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updatedInstitution = req.body;
    const apiRes = await Institution.findByIdAndUpdate(req.params.id, updatedInstitution, {
      new: true,
    });
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const apiRes = await Institution.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
