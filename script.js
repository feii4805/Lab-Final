document.getElementById('restaurantForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('cuisine').value;
    fetchRestaurants(location);
});

function fetchRestaurants(location) {
    // Replace with the correct API endpoint and query parameter
    fetch(`https://scavenger-hunt-pd6b.onrender.com/api/restaurants?location=${location}`)
        .then(response => response.json())
        .then(data => {
            // Assuming the data contains latitude and longitude
            updateMap(data.latitude, data.longitude, data.restaurants);
        })
        .catch(error => console.error('Error:', error));
}

function updateMap(latitude, longitude, restaurants) {
    // Initialize the map with the given latitude and longitude
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 15
    });

    // Place markers for each restaurant
    restaurants.forEach(restaurant => {
        new google.maps.Marker({
            position: { lat: restaurant.latitude, lng: restaurant.longitude },
            map: map,
            title: restaurant.name
        });
    });
}

