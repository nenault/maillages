const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const institutionSchema = new Schema({
  code: String,
  type: {
    type: String,
    enum: ["EHPAD", "Résidence", "SAD"],
    default: "EHPAD",
  },
  name: String,
  groupe: String,
  postal_code: String,
  city: String,
  departement: String,
});

const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
