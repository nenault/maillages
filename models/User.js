const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: {
    type: Date,
    default: Date.now,
  },
  isMob: {
    type: Boolean,
    default: false,
  },
  calls: {
    type: Number,
    default: 0,
  },
  contacts: [
    {
      contact: {
        type: Schema.Types.ObjectId,
        ref: "Contact",
        default: null,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
