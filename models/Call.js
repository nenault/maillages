const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const callSchema = new Schema({
  comment: String,
  last: String,
  created: {
    type: Date,
    default: Date.now,
  },
  creator: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
  },
});

const Call = mongoose.model("Call", callSchema);

module.exports = Call;
