const express = require("express");
const { search } = require("../controllers/users/movie");
const { reservation ,getSeatsInformation} = require("../controllers/users/reservation");
const router = express.Router();

router.get('/search/:query',search)

router.post('/reservation',reservation)

router.post('/reservation/getSeatInfo',getSeatsInformation)

module.exports = router;
