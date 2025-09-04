const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.post("/addReservation", reservationController.addReservation);
router.get("/getAllReservations", reservationController.getAllReservations);

module.exports = router;
