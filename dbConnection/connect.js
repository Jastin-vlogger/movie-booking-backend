const mongoose = require("mongoose");
require('dotenv').config()

const connect = async () => {
  try {
    let conn = await mongoose.connect(
        process.env.MONGOURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (!err) console.log("connected");
        else console.log(err);
      }
    );
  } catch (error) {
    console.log('error occured while connecting')
  }
};

module.exports = {
  connect,
};
