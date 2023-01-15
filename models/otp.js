const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: 60 },
    },
  },
  { timestamps:true }
);

const OTP = mongoose.model("otp", Schema);
module.exports = OTP;
