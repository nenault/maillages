var express = require("express");
var router = express.Router();
const Contact = require("../models/Contact");

router.get("/", async (req, res, next) => {
  try {
    const apiRes = await Contact.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Contact.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = req.body;
    const apiRes = await Contact.create(newContact);
    res.status(201).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updatedContact = req.body;
    const apiRes = await Contact.findByIdAndUpdate(req.params.id, updatedContact, {
      new: true,
    });
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const apiRes = await Contact.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
