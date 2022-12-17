const asyncHandler = require("express-async-handler");
const Theater = require("../../models/theater");
const { generateTheaterToken } = require("../../utils/generatetoken");

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

const register = asyncHandler(async (req, res) => {
  try {
    const { email, password, name, theater, city, address, state } = req.body;
    const newTheater = await Theater.create({
      email,
      password,
      name,
      theater,
      city,
      address,
      state,
    });
    res.status(201).json({ theater: newTheater._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
});

const login= asyncHandler(async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await Theater.login(email,password);
        console.log("aaaaaaaaaaa",user);
        if(user.isApproved){
  
            const token = generateTheaterToken(user._id);
    
            res.cookie("TheaterToken",token,{
                withCrdentials:true,
                httpOnly:false,
                message:maxAge * 1000,
            })
            res.status(200).json({user:user._id,created:true})
        }else{
            console.log("blocked")
                   
            res.json({error:"blocked",created:false})
        }
    } catch (err) {
        console.log(err.message);
        const error = err.message
        const errors = handleErrors(err)
        console.log("errrr",errors);
        res.json({error,created:false})
    }
})

module.exports = {
  register,
  login
};
