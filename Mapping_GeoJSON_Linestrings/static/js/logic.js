// We create the tile layer that will be the background of our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "navigation-day-v1",
    maxZoom: 18,
    accessToken: API_KEY
});

let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "navigation-night-v1",
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
    Day: day,
    Night: night,
    Satellite: satellite
};


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [night]
})


// Pass layers into layer control
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON from a URL (The RAW github in this case)
// This goes after the tile layer to ensure that the map is actually created with larget datasets
let torontoData = "https://raw.githubusercontent.com/FreshOats/Mapping_Earthquakes/main/torontoRoutes.json"


// Grabbing our GeoJSON data
let myStyle = {
    color: "#ffffa1",
    weight: 2,
    opacity: 0.5
}


d3.json(torontoData).then(function (data) {
    console.log(data);
    // Creating the GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>Airline: " + feature.properties.airline + "<hr>Destination: " + feature.properties.dst + "</h3>")
        }
        
    })
    .addTo(map);
});


