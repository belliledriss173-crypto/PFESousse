const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.post("/addReservation", reservationController.addReservation);
router.get("/getAllReservations", reservationController.getAllReservations);
router.get("/getReservationById/:id",reservationController .getReservationById);
router.delete("/deleteReservationById/:id",reservationController .deleteReservationById);
router.patch("/updateReservationById/:id",reservationController .updateReservationById);

module.exports = router;
