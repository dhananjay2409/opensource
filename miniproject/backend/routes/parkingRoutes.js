const express = require("express");
const router = express.Router();
const { getAllSpots, createSpot, reserveSpot } = require("/parkingController");

router.get("/", getAllSpots); // GET all parking spots
router.post("/", createSpot); // POST a new parking spot
router.post("/reserve", reserveSpot); // POST to reserve a spot

module.exports = router;
