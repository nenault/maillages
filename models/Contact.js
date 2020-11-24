const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: String,
  type: String,
  contact: String,
  histo: String,
  created: {
    type: Date,
    default: Date.now,
  },
  comment: String,
  volunteer_1: {
    type: String,
    default: null,
  },
  volunteer_2: {
    type: String,
    default: null,
  },
  volunteers: [
    {
      volunteer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
  ],
  calls: [
    {
      call: {
        type: Schema.Types.ObjectId,
        ref: "Call",
        default: null,
      },
    },
  ],
  frequency: {
    type: String,
    enum: [
      "Chaque jour",
      "1 fois par semaine",
      "2 fois par semaine",
      "email : pas de limitation",
      "Ne souhaite plus être appelé",
    ],
    default: "1 fois par semaine",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
    default: null,
  },
  lastcall: {
    type: Date,
    default: null,
  },
  needcall: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  institution_code: {
    type: String,
    default: null,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
