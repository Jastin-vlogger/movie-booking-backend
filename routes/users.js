var express = require('express');
var router = express.Router();
const {signup} = require('../controllers/users/signup')
const {getImages,getMovieInformation,movieInformation,addReview,getMovieReviewById}= require('../controllers/users/movie')

/* GET users listing. */
router.post('/signup',signup);

router.get('/images/:key' ,getImages)

router.get('/movieInfo' ,getMovieInformation)

router.get('/movieInfo/:id' ,movieInformation)

router.post('/addreviews',addReview)

router.get('/movieReview/:id',getMovieReviewById)




module.exports = router;
