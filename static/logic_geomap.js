// Adding tile layer
var greenMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy;<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var blackMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
  });

  // Creating map object
  var map = L.map("map", {
    center: [36.0129, -2.8526],
    zoom: 2,
    layers: [blackMap, greenMap]
  });
  
  blackMap.addTo(map);

//  Layers based on Markers
var confirmedLayer = new L.layerGroup();
var recoveredLayer = new L.layerGroup();
var deathsLayer = new L.layerGroup(); 
var activeLayer = new L.layerGroup();
var alldataLayer= new L.layerGroup();

// base layers
var baseMaps = {
    "Street Map": greenMap,
    "Dark Map": blackMap
  };

// overlay maps
// Layer by Markers Names
var overlayMaps = {
    "Confirmed": confirmedLayer,
    "Recovered": recoveredLayer,
    "Deaths": deathsLayer,
    "Active":activeLayer,
    "All Confrimed Data Points": alldataLayer
  };
// add control
L.control.layers(baseMaps,overlayMaps).addTo(map);
///////////////////////////////// All Confirmed Data////////////////////////////////////
// Load in geojson data
var dataUrl= "https://api.covid19api.com/all";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(dataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(alldataLayer); 
      alldataLayer.addTo(map);  
  }
 });

////////////////////////////////us//////////////////////////////////////////////////////
// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/us/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});
//     ////////////////////////////////////////////// Spain/////////////////////////////////////////////////////
// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/spain/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});

// //////////////////////////////// united-kingdom ///////////////////////////////////////////////
// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/united-kingdom/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});
//  //////////////////////////////////// france//////////////////////////////////////////////////////////////

// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/france/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});


//   ///////////////////////////////// china ////////////////////////////////

// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/china/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});
// ////////////////////////////////////////////germany//////////////////////////////////////

// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/germany/tatus/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});

// ////////////////////////////////////////////iran//////////////////////////////////////

// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/iran/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});
/////////////////////////////////////////////italy////////////////////////////////////////////////////
// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/italy/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});
///////////////////////////////////////russia////////////////////////////////////////////////////
// Load in geojson data
var alldataUrl= "https://api.covid19api.com/live/country/russia/status/confirmed'";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Confirmed > 50000){
        var color= "red";
      }
      else if(data[i].Confirmed > 10000){
        var color= "orange";
      } 
      else if(data[i].Confirmed> 5000){
        var color= "yellow";
      } 
      else if(data[i].Confirmed > 1000){
        var color= "purple";
      } 
      else if(data[i].Confirmed > 100){
        var color= "blue";
      } 
      else if(data[i].Confirmed > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Confirmed*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Confirmed + "</h3>")
      .addTo(confirmedLayer); 
      confirmedLayer.addTo(map);  
  }
 });
// Grab data with d3 Recovered!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Recovered > 50000){
        var color= "red";
      }
      else if(data[i].Recovered > 10000){
        var color= "orange";
      } 
      else if(data[i].Recovered> 5000){
        var color= "yellow";
      } 
      else if(data[i].Recovered > 1000){
        var color= "purple";
      } 
      else if(data[i].Recovered > 100){
        var color= "blue";
      } 
      else if(data[i].Recovered > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Recovered*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Recovered: " + data[i].Recovered + "</h3>")
      .addTo(recoveredLayer); 
      recoveredLayer.addTo(map);  
  }
});
// Grab data with d3 Deaths!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Deaths > 50000){
        var color= "red";
      }
      else if(data[i].Deaths > 10000){
        var color= "orange";
      } 
      else if(data[i].Deaths> 5000){
        var color= "yellow";
      } 
      else if(data[i].Deaths > 1000){
        var color= "purple";
      } 
      else if(data[i].Deaths > 100){
        var color= "blue";
      } 
      else if(data[i].Deaths > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Deaths*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Deaths + "</h3>")
      .addTo(deathsLayer); 
      deathsLayer.addTo(map);  
  }
});
// Grab data with d3 Active!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Active > 50000){
        var color= "red";
      }
      else if(data[i].Active > 10000){
        var color= "orange";
      } 
      else if(data[i].Active> 5000){
        var color= "yellow";
      } 
      else if(data[i].Active > 1000){
        var color= "purple";
      } 
      else if(data[i].Active > 100){
        var color= "blue";
      } 
      else if(data[i].Active > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Active*3,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Active: " + data[i].Active + "</h3>")
      .addTo(activeLayer); 
      activeLayer.addTo(map);  
  }
});