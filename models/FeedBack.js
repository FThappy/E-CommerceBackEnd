const mongoose = require("mongoose");

const FeedBackSchema = new mongoose.Schema(
  {
    userId: { type: String },
    email: { type: String},
    title: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedBack", FeedBackSchema);
