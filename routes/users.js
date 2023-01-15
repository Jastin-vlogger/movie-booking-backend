var express = require("express");
var router = express.Router();
const { signup ,otp } = require("../controllers/users/signup");
const {
  getImages,
  getMovieInformation,
  movieInformation,
  addReview,
  getMovieReviewById,
  GetTheaterMovies,
} = require("../controllers/users/movie");
const { nodmail } = require("../utils/nodemailer");

/* GET users listing. */

router.post("/signup", signup);

router.post("/otp", otp);

router.get("/images/:key", getImages);

router.get("/movieInfo", getMovieInformation);

router.get("/movieInfo/:id", movieInformation);

router.post("/addreviews", addReview);

router.get("/movieReview/:id", getMovieReviewById);

router.get("/nodemailer", nodmail);

router.get("/GetTheaterMovies", GetTheaterMovies);

module.exports = router;
