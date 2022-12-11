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
       const movie = await Movie.find()
    //    console.log(movie)
       res.status(200).json(movie)
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
  getImages,
  getMovieInformation
};
