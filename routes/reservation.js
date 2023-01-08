const express = require("express");
const { reservation ,getSeatsInformation} = require("../controllers/users/reservation");
const router = express.Router();

router.post('/reservation',reservation)

router.post('/reservation/getSeatInfo',getSeatsInformation)

module.exports = router;
