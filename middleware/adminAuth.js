const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admin = require("../models/admin");

const config = process.env;
const   verifyAdminToken = (req, res) => {
  const token = req.cookies.adminToken;
    console.log(token)
  if (token) {
    jwt.verify(token, config.ADMIN_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        // next();
      } else {
        const user = await Admin.findById(decodedToken.id);
        console.log(user);
        if (user) {
          console.log("im njan user true");
          res.json({ status: true, user: user.email ,token:token});
        } else {
          res.json({ status: false });
        }
        // next();
      }
    });
  } else {
    res.json({ status: false });
    // next();
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, config.ADMIN_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await Admin.findById(decodedToken.id);
        console.log(user);
        if (user) {
          console.log("im njan user true");
          res.json({ status: true, user: user.email });
        } else {
          res.json({ status: false });
        }
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports = { verifyAdmin ,verifyAdminToken};