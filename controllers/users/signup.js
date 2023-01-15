const asyncHandler = require("express-async-handler");
const User = require("../../models/user");
const OTP = require("../../models/otp");
const { generateToken } = require("../../utils/generatetoken");
const otpGenerator = require("otp-generator");
const { nodmail } = require("../../utils/nodemailer");

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

const signup = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const user = {
      email,
    };
    // const number = parseInt(phone)
    const otp = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(otp);
    const alreadyUser = await User.findOne({ email: email });
    if (alreadyUser) {
      const userOtp = {
        email: alreadyUser.email,
        otp: otp,
        date: Date.now(),
      };
      OTP(userOtp)
        .save()
        .then(async (response) => {
          console.log(response);
          const returnedOtp = await nodmail(alreadyUser.email, otp);
          if (returnedOtp) {
            // let token = await generateToken(alreadyUser._id);
            // res.cookie("userToken", token).json({
            //   status: true,
            //   email: alreadyUser.email,
            // });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      User(user)
        .save()
        .then(async (response) => {
          const userOtp = {
            email: response.email,
            otp: otp,
            date: Date.now(),
          };
          const saveotp = await OTP(userOtp).save();
          const returnedOtp = await nodmail(response.email, otp);
          // console.log(response);
          // let token = await generateToken(response._id);
          // res.cookie("userToken", token).json(response.email);
        });
    }
  } catch (error) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
    // res.status(error.status).json(error.message)
  }
});

const otp = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { otp, email } = req.body;
    const findOtp = await OTP.findOne({ email: email.email, otp: Number(otp) });
    if (findOtp) {
      console.log(findOtp);
      let token = await generateToken(findOtp.email);
      res.cookie("userToken", token).json(findOtp.email);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  signup,
  otp,
};
