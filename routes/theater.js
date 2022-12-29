const express = require("express");
const router = express.Router();
const {
  register,
  login,
  fetchTheaters,
  approve,
  addScreen,
  getTheaterScreen,
  screenInfo,
  addShow
} = require("../controllers/theaterowners/register");

/* GET users listing. */
router.post("/register", register);

router.post("/login", login);

router.post('/addscreen', addScreen)

router.get("/fetch", fetchTheaters);

router.put("/approveTheater", approve);

router.get('/getScreen/:id',getTheaterScreen)

router.get('/screenInfo/:id',screenInfo)

router.post('/addShow',addShow)


module.exports = router;
