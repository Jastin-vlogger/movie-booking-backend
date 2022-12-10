
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
    },
    name: {
      type: String,
    },
    phone:{
        type:Number,  
    }
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);
module.exports = User;