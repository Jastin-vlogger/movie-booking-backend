const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");
const Reservation = require("../../models/reservation");
const generateQR = require("../../utils/generateQR");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const reservation = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { paymentId, total } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount: total,
      currency: "INR",
      description: "Movie+",
      payment_method: paymentId,
      confirm: true,
    });
    const data = await Reservation(req.body).save();
    const qrcode = await generateQR(
      "http//:localhost:3000/reservation/" + data.id
    );
    await Reservation.findByIdAndUpdate(data.id,{$set:{qrcode:qrcode}})
    res.json({ status: "payment successfull", data, qrcode });
  } catch (error) {
    console.log(error);
  }
});

const getSeatsInformation = asyncHandler(async (req, res) => {
  try {
    console.log("helo");
    const { date, movieId, theaterId, time } = req.body;
    console.log(date, movieId, theaterId, time);
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
    if (data.length === 0) {
      res.json({ seat: false});
    } else {
      let seat = [];
      for (let i = 0; i < data[0].seats.length; i++) {
        for (let j = 0; j < data[0].seats[i].length; j++) {
          seat.push(data[0].seats[i][j]);
        }
      }
      res.json(seat);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  reservation,
  getSeatsInformation,
};
