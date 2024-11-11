// frontend/script.js

// Fetch and display real-time parking availability
async function fetchParkingAvailability() {
    try {
        const response = await fetch("http://localhost:5000/api/parkingspots");
        const spots = await response.json();
        const availabilityContainer = document.getElementById("parking-availability");
        availabilityContainer.innerHTML = "";

        spots.forEach(spot => {
            const spotElement = document.createElement("div");
            spotElement.classList.add("parking-spot");
            spotElement.innerHTML = `
                <h3>Location: ${spot.location}</h3>
                <p>Price per hour: $${spot.pricePerHour}</p>
                <p>Status: ${spot.isOccupied ? "Occupied" : "Available"}</p>
            `;
            availabilityContainer.appendChild(spotElement);
        });
    } catch (error) {
        console.error("Error fetching parking availability:", error);
    }
}

// Reserve a parking spot and make a payment
async function reserveParking() {
    const location = document.getElementById("location").value;
    const hours = document.getElementById("hours").value;
    const pricePerHour = 5;  // Assuming a static price for simplicity
    const totalCost = pricePerHour * hours;

    try {
        const response = await fetch("http://localhost:5000/api/parkingspots/reserve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ location, hours, totalCost })
        });
        
        if (response.ok) {
            alert(`Reservation successful! Total cost: $${totalCost}`);
        } else {
            alert("Reservation failed.");
        }
    } catch (error) {
        console.error("Error reserving parking:", error);
    }
}

// Find the nearest parking spot
function findNearestParking() {
    const navigationResult = document.getElementById("navigation-result");
    navigationResult.textContent = "Guiding you to the nearest available parking spot...";
    // Add intelligent navigation code here (e.g., Google Maps API integration)
}

// Display parking management dashboard for authorities
async function displayManagementDashboard() {
    try {
        const response = await fetch("http://localhost:5000/api/parkingspots");
        const spots = await response.json();
        const dashboardContainer = document.getElementById("management-dashboard");

        dashboardContainer.innerHTML = `<p>Total Spots: ${spots.length}</p>`;
        // Additional data visualization can be added here
    } catch (error) {
        console.error("Error loading management dashboard:", error);
    }
}

// Show nearby transportation options for multimodal integration
function showNearbyTransportOptions() {
    const transportationList = document.getElementById("transportation-list");
    transportationList.innerHTML = `
        <li>Bus Station: 5 mins walk</li>
        <li>Bike Sharing: 2 mins walk</li>
        <li>Subway: 10 mins walk</li>
    `;
}

// Load data on page load
window.onload = () => {
    fetchParkingAvailability();
    displayManagementDashboard();
};
