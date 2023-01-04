var express = require("express");
var router = express.Router();
const {
  addmovie,
  addMovieInfo,
  adminLogin,
} = require("../controllers/admins/addmovies");

const {verifyAdminToken} = require('../middleware/adminAuth')


const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/movies/",
  filename: (req, file, cb) => {
    console.log(req.params.id)
    req.imageName = `${req.params.id}.jpg`;
    cb(null, req.imageName);
  },
});

const upload = multer({
  storage: storage,
});

/* GET users listing. */
router.get('/',verifyAdminToken)

router.post("/movieImage/upload/:id", upload.single("image"), addmovie);

router.post("/movieinfo", addMovieInfo);

router.post('/login',adminLogin)



module.exports = router;
