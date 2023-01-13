const asyncHandler = require("express-async-handler");
const { getFileStream } = require("../../utils/s3");
const Movie = require('../../models/Movie')

const getImages = asyncHandler(async(req, res) => {
  try {
    console.log(req.params);
    const key = req.params.key;
    const readStream = getFileStream(key);
    // console.log(readStream)
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
});

const getMovieInformation = asyncHandler(async(req,res)=>{
    try {
       const movie = await Movie.find({}).sort({_id:-1})
       res.status(200).json(movie)
    } catch (error) {
        console.log(error)
    }
})

const movieInformation = asyncHandler(async(req,res)=>{
  try {
    const id =req.params.id
    const movie = await Movie.findById(id)
    const no_review_ration = movie.Review.length
    console.log(typeof movie)
    let sum = 0
    let rating = {}
    for (let i = 0; i < movie.Review.length; i++) {
      sum = movie.Review[i].rating +sum;
    }
    const sum_of_ratin = sum * no_review_ration/100;
    const movieInfo = {...movie,no_review_ration,sum_of_ratin}
    console.log(movie)
    res.json(movieInfo)
  } catch (error) {
    console.log(error)
  }
})

const addReview = asyncHandler(async (req, res) => {
  try {
    const { id, rating, message } = req.body;
    console.log(id,rating ,message)
    const posting = await Movie.findOneAndUpdate(
      { _id: id},
      {
        $push: {
          Review: {
            rating: rating,
            message: message,
          },
        },
      }
    );

    res.json(posting)
  } catch (error) {}
});

const getMovieReviewById = asyncHandler(async(req,res)=>{
  try {
    const id = req.params.id
    const data = await Movie.findById(id).select('Review')
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})
module.exports = {
  getImages,
  getMovieInformation,
  movieInformation,
  addReview,
  getMovieReviewById
};
