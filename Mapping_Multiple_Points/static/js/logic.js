console.log("working");

// Create map object with center and zoom level
let map = L.map('mapid').setView([34.0522, -118.2437], 13);

L.circle([34.0522, -118.2437], {
    radius: 300,
    color: 'black',
    fillColor: 'yellow'

}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "dark-v10",
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);