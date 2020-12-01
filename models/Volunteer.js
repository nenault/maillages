const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  email: { type: String, required: true },
  prenom: String,
  nom: String,
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
