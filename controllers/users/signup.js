const asyncHandler = require("express-async-handler");
const User = require("../../models/user");
const { generateToken } = require("../../utils/generatetoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);

  if (err.code === 11000) {
    errors.email = "Phone number is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signup = asyncHandler(async(req, res) => {
  try {
    const { phone } = req.body;
    console.log(req.body);
    const user = {
      phone,
    };
    console.log(typeof phone)
    const number = parseInt(phone)
    console.log(typeof number)
    const alreadyUser = await User.findOne({ phone: number });
    console.log(alreadyUser)
    if (alreadyUser) {
        console.log('hello im in already')
        let token = await generateToken(alreadyUser._id)
        res.cookie("userToken",token).json({
            status:true,
            phone:alreadyUser.phone
        })
    } else {
      User(user)
        .save()
        .then(async (response) => {
          console.log(response);
          let token = await generateToken(response._id);
          res.cookie("userToken", token).json({
            status: true,
          });
        });
    }
  } catch (error) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
    // res.status(error.status).json(error.message)
  }
});

module.exports = {
  signup,
};
