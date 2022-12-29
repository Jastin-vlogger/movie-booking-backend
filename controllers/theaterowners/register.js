const asyncHandler = require("express-async-handler");
const { Types, SchemaTypes } = require("mongoose");
const theater = require("../../models/theater");
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

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Theater.login(email, password);
    // console.log("aaaaaaaaaaa", user);
    if (user.isApproved) {
      const token = await generateTheaterToken(user._id);
      // console.log(token)
      res.cookie("TheaterToken", token, {
        withCrdentials: true,
        httpOnly: false,
        message: 60 * 60 * 24 * 1000,
      });
      res.status(200).json({ user: user._id, created: true });
    } else {
      console.log("blocked");

      res.json({ error: "blocked", created: false });
    }
  } catch (err) {
    console.log(err.message);
    const error = err.message;
    const errors = handleErrors(err);
    console.log("errrr", errors);
    res.json({ error, created: false });
  }
});

const fetchTheaters = asyncHandler(async (req, res) => {
  try {
    const theater = await Theater.find();
    res.status(200).json(theater);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

const approve = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { status, id } = req.body;
    if (status === "approve") {
      const user = await Theater.findByIdAndUpdate(
        { _id: Types.ObjectId(id) },
        { $set: { isApproved: true } }
      );
      res.json(user);
    } else {
      const user = await Theater.findByIdAndUpdate(
        { _id: ObjectId(id) },
        { $set: { isApproved: false } }
      );

      res.json(user);
    }
  } catch (err) {
    console.log(err);
    sas;
  }
});

const reject = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    console.log("unblock");
    const user = await Theater.findByIdAndUpdate(
      { _id: ObjectId(id) },
      { $set: { isApproved: false } }
    );

    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

const addScreen = asyncHandler(async (req, res) => {
  try {
    const { ScreenName, Row, Column, theaterId } = req.body;
    // console.log(req.body)
    let data = await Theater.findOneAndUpdate(
      { _id: Types.ObjectId(theaterId) },
      {
        $push: {
          Screen: {
            screenName: ScreenName,
            row: Row,
            Numbers: Column,
          },
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.sendStatus(error.status).json(error.message);
  }
});

const getTheaterScreen = async (req, res) => {
  try {
    console.log(req.params.id);
    const screen = await Theater.findOne({ _id: Types.ObjectId(id) });
    console.log(screen.Screen);
    res.json(screen.Screen);
  } catch (error) {
    res.sendStatus(error.status).json(error.message);
  }
};

const screenInfo = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    // console.log(id)
    const gotInfo = await Theater.findById({ _id: id }).select("Screen");
    console.log(gotInfo);
    res.json(gotInfo.Screen);
  } catch (error) {
    console.log(error);
  }
});

const addShow = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { id, screen,time } = req.body;
    const data = await Theater.findOne({
      Screen: { $elemMatch: { screenName: screen } },
    }).select("Screen");
    console.log(data.Screen);
    const gotScreen = data.Screen.filter((val) => val.screenName === screen);
    console.log(gotScreen[0]);
    let date = [time]
    let seating = [];
    let seats = [];
    for (let i = 0; i < date.length; i++) {
      let time = date[i];
      for (let i = 0; i < gotScreen[0].row; i++) {
        let arr = [];
        let id = String.fromCharCode(i + 65);
        for (let j = 0; j < gotScreen[0].Numbers; j++) {
          arr.push({ index: `${id}${j + 1}`, isReserved: false, user: "" });
        }
        seats.push(arr);
      }
      seating.push({ time, seats });
    }
    console.log(seating);
    const updatingSeats = await Theater.updateOne(
      { _id: Types.ObjectId(id), "Screen":{"$elemMatch":{"screenName":gotScreen[0].screenName}}},
      {$push:{"Screen.$.seating":seating}}
    );
    console.log(updatingSeats);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  register,
  login,
  fetchTheaters,
  reject,
  approve,
  addScreen,
  getTheaterScreen,
  screenInfo,
  addShow,
};
