console.log("working");

// Create map object with center and zoom level
let map = L.map('mapid').setView([40.7, -94.5], 4);

// pull city data from the cities.js file
let cityData = cities;


// Loop through the cities array and create a marker for each city using a forEach loop
cityData.forEach(function (city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population / 200000,
        color: "orange",
        lineweight: 4
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "dark-v10",
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);``