var express = require('express');
var router = express.Router();
const {signup} = require('../controllers/users/signup')
const {getImages,getMovieInformation}= require('../controllers/users/movie')

/* GET users listing. */
router.post('/signup',signup);

router.get('/images/:key' ,getImages)

router.get('/movieInfo' ,getMovieInformation)


module.exports = router;
