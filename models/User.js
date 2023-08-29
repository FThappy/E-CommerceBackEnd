const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    desc: { type: String, default: "Customer", },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    address :{type : String},
    birth : {type : Date},
    phone : {type : String},
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
