// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "streets-v11",
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "satellite-streets-v11",
	accessToken: API_KEY
});

let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "navigation-night-v1",
  accessToken: API_KEY
});

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [night]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets, 
  "Night": night, 
  "Light": light
};

// 1. Add a 2nd layer group for the tectonic plate data.
// 1. Add a 3rd layer group for the major earthquake data.
let allEarthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();
let majorQuakes = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonicPlates,
  "Major Earthquakes": majorQuakes,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.5,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.

  function getColor(magnitude) {
    if (magnitude > 7) {
      return "#62040D";
    }
    if (magnitude > 6) {
      return "#8D0207";
    }
    if (magnitude > 5) {
      return "#E60000";
    }
    if (magnitude > 4) {
      return "#E85D04";
    }
    if (magnitude > 3) {
      return "#F99D24";
    }
    if (magnitude > 2) {
      return "#FFDE0A";
    }
    if (magnitude > 1) {
      return "#FFFF6B";
    }
    return "#97FF47";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
       layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "<hr></h3><h4>The epicenter was " + feature.properties.place + "</h4>");
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);
});

// 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function (data) {

  // 4. Use the same style as the earthquake data.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.5,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.

  function getColor(magnitude) {
    if (magnitude > 7) {
      return "#62040D";
    }
    if (magnitude > 6) {
      return "#8D0207";
    }
    if (magnitude > 5) {
      return "#E60000";
    }
    if (magnitude > 4) {
      return "#E85D04";
    }
    if (magnitude > 3) {
      return "#F99D24";
    }
    if (magnitude > 2) {
      return "#FFDE0A";
    }
    if (magnitude > 1) {
      return "#FFFF6B";
    }
    return "#97FF47";
  }
  

  // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.

  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }


  // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  // sets the style of the circle, and displays the magnitude and location of the earthquake
  //  after the marker has been created and styled.
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      console.log(data)
      return L.circleMarker(latlng);
    },

    style: styleInfo,

    // onEachFeature: function (feature, layer) {
    //   layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "<hr>Location:</h3><h4> " + feature.properties.place + "</h4>");
    // }
  }).addTo(majorQuakes);

  // 8. Add the major earthquakes layer to the map.
  majorQuakes.addTo(map);

  // 9. Close the braces and parentheses for the major earthquake data.
});



  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5, 6, 7];
  const colors = [
    "#97FF47",
    "#FFFF6B",
    "#FFDE0A",
    "#F99D24",
    "#E85D04",
    "#E60000", 
    "#8D0207", 
    "#62040D"
  ];

  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};

// Finally, we our legend to the map.
legend.addTo(map);


// 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
d3.json("static/json/tectonicplates.json").then(function (data) {
  
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0,
      color: "blue",
      stroke: true,
      weight: 1
    };
  }

  L.geoJson(data, {

    style: styleInfo,
    // onEachFeature: function (feature, layer) {
    //   layer.bindPopup("<h3>Tectonic Plate: " + feature.properties.PlateName + "</h4>");
    // }
  }).addTo(tectonicPlates);
  tectonicPlates.addTo(map);
});
  

  
