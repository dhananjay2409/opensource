let map;
let parkingSpots = [
    { location: "Hitech City", pricePerHour: 10, lat: 17.4504, lng: 78.3807 },
    { location: "Gachibowli", pricePerHour: 12, lat: 17.4467, lng: 78.3498 },
    { location: "Banjara Hills", pricePerHour: 15, lat: 17.4208, lng: 78.4482 },
    { location: "Jubilee Hills", pricePerHour: 14, lat: 17.4274, lng: 78.4424 }
];

// Initialize the map
function initMap() {
    const hyderabad = { lat: 17.3850, lng: 78.4867 };  // Default to Hyderabad center
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: hyderabad
    });
}

// Function to find parking based on the user input
function findParking() {
    const location = document.getElementById("location-input").value;
    if (!location) {
        alert("Please enter a location");
        return;
    }

    // Use geocoding to convert the entered location to latitude and longitude
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results[0]) {
            const destination = results[0].geometry.location;
            map.setCenter(destination);
            displayNearbyParking(destination);
        } else {
            alert("Could not find location: " + status);
        }
    });
}

// Display parking spots and their prices
function displayNearbyParking(destination) {
    // Clear any existing markers
    const markers = map.markers || [];
    markers.forEach(marker => marker.setMap(null));
    map.markers = [];

    // Add parking spot markers
    parkingSpots.forEach(spot => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(spot.lat, spot.lng),
            destination
        );

        if (distance <= 5000) {  // Show parking spots within 5 km
            const marker = new google.maps.Marker({
                position: { lat: spot.lat, lng: spot.lng },
                map: map,
                title: spot.location
            });

            // Info window for each parking spot
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <h3>${spot.location}</h3>
                        <p>Price per Hour: ₹${spot.pricePerHour}</p>
                    </div>
                `
            });

            // Open info window when clicking on a marker
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });

            // Store the marker in the map object to access later for removal
            map.markers.push(marker);
        }
    });
}
