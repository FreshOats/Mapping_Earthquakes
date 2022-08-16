console.log("working");

// Create map object with center and zoom level
let map = L.map('mapid').setView([30, 30], 2);


// let sanFranAirport =
// {
//     "type": "FeatureCollection", "features": [{
//         "type": "Feature",
//         "properties": {
//             "id": "3469",
//             "name": "San Francisco International Airport",
//             "city": "San Francisco",
//             "country": "United States",
//             "faa": "SFO",
//             "icao": "KSFO",
//             "alt": "13",
//             "tz-offset": "-8",
//             "dst": "A",
//             "tz": "America/Los_Angeles"
//         },
//         "geometry": {
//             "type": "Point",
//             "coordinates": [-122.375, 37.61899948120117]
//         }
//     }
//     ]
// };


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map); 


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

