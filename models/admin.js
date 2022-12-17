const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
const Admins = mongoose.model("Admin", Admin);
module.exports = Admins;