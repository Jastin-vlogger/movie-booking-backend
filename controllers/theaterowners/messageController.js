const MessageModel = require("../../models/message");
const AdminStaff = require("../../models/admin");
const Theater = require("../../models/theater");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    console.log(data);
    if (data) res.json({ msg: "message added successfully" });
    else res.json({ msg: "failed to add message to database" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    // console.log("iddddd",req.body)
    const messages = await MessageModel.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    // console.log(projectMessages)
    res.json(projectMessages);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAdmin = async (req, res, next) => {
  try {
    // console.log("req.id",req.params.id)
    console.log("aheheheheh");
    const users = await AdminStaff.find({});
    console.log(users);
    res.json(users);
  } catch (ex) {
    console.log(ex)
    next(ex);
  }
};
module.exports.getTheater = async (req, res, next) => {
  try {
    // console.log("req.id",req.params.id)
    const users = await Theater.find({}).select(["email", "name", "_id"]);
    res.json(users);
  } catch (ex) {
    console.log(ex)
    next(ex);
  }
};
