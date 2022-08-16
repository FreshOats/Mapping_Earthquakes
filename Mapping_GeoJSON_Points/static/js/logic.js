// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "dark-v10",
    maxZoom: 18,
    accessToken: API_KEY
});


let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "satellite-streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});

//Creaate base layer object
let baseMaps = {
    Street: streets,
    Dark: dark,
    Satellite: satellite
};


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets, dark, satellite]
})


// Pass layers into layer control
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON from a URL (The RAW github in this case)
// This goes after the tile layer to ensure that the map is actually created with larget datasets
let airportData = "https://raw.githubusercontent.com/FreshOats/Mapping_Earthquakes/main/majorAirports.json"

// Grabbing our GeoJSON data

d3.json(airportData).then(function (data) {
    console.log(data);

    // Creating the GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "<hr>Airport Name: " + feature.properties.name + "</h3>")
        }
    }).addTo(map);
});

