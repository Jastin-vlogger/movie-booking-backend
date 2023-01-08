const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");
const Reservation = require("../../models/reservation");
const generateQR = require("../../utils/generateQR");

const reservation = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const data = await Reservation(req.body).save();
    const qrcode = await generateQR(
      "http//:localhost:3000/reservation/" + data.id
    );
    res.json(data, qrcode);
  } catch (error) {
    console.log(error);
  }
});

const getSeatsInformation = asyncHandler(async (req, res) => {
  try {
    console.log("helo");
    const { date, movieId, theaterId, time } = req.body;
    const data = await Reservation.aggregate([
      {
        $match: {
          $and: [
            {
              showDate: date,
            },
            {
              movieId: Types.ObjectId(movieId),
            },
            {
              cinemaId: Types.ObjectId(theaterId),
            },
            {
              startAt: time,
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          seats: {
            $push: "$seats",
          },
        },
      },
    ]);
    console.log(data);
    let seat = [];
    for (let i = 0; i < data[0].seats.length; i++) {
      for (let j = 0; j < data[0].seats[i].length; j++) {
        seat.push(data[0].seats[i][j]);
      }
    }
    res.json(seat);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  reservation,
  getSeatsInformation,
};
