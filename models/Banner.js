const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    img: { type: String, require: true },
    title: { type: String },
    desc: { type: String },
    bg: { type: String },
    active: { type: Boolean,default : true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bannner", BannerSchema);