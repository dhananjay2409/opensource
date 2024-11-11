const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/parkingSpots.json");
module.exports = { getAllSpots, createSpot, reserveSpot };

// Helper function to read data from JSON file
function readData() {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
}

// Helper function to write data to JSON file
function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
}

// Get all parking spots
exports.getAllSpots = (req, res) => {
    try {
        const spots = readData();
        res.json(spots);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch parking spots" });
    }
};

// Create a new parking spot
exports.createSpot = (req, res) => {
    try {
        const spots = readData();
        const newSpot = {
            id: spots.length ? spots[spots.length - 1].id + 1 : 1,
            location: req.body.location,
            isOccupied: false,
            pricePerHour: req.body.pricePerHour,
        };
        spots.push(newSpot);
        writeData(spots);
        res.status(201).json(newSpot);
    } catch (error) {
        res.status(500).json({ error: "Failed to create parking spot" });
    }
};

// Reserve a parking spot (mock payment included)
exports.reserveSpot = (req, res) => {
    try {
        const { id, hours } = req.body;
        const spots = readData();
        const spot = spots.find((s) => s.id === id);

        if (!spot || spot.isOccupied) {
            return res.status(400).json({ error: "Spot not available" });
        }

        spot.isOccupied = true;
        writeData(spots);

        const totalCost = spot.pricePerHour * hours;
        res.json({ message: "Reservation successful", totalCost });
    } catch (error) {
        res.status(500).json({ error: "Failed to reserve parking spot" });
    }
};
