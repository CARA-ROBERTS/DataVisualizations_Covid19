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
var detailconfirmedLayer = new L.layerGroup();
var alldataLayer = new L.layerGroup();
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
    "Detailed Confirmed US":detailconfirmedLayer,
    "All Data Layer":alldataLayer
  };
// add control
L.control.layers(baseMaps,overlayMaps).addTo(map);
///////////////////////////////// All Data////////////////////////////////////
// Load in geojson data
var alldataUrl= "https://api.covid19api.com/all";
var geojson;
// Grab data with d3 CONFIRMED!!!!
d3.json(alldataUrl , function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      var color= "";
      if (data[i].Cases > 50000){
        var color= "red";
      }
      else if(data[i].Cases > 10000){
        var color= "orange";
      } 
      else if(data[i].Cases > 5000){
        var color= "yellow";
      } 
      else if(data[i].Cases > 1000){
        var color= "purple";
      } 
      else if(data[i].Cases > 100){
        var color= "blue";
      } 
      else if(data[i].Cases > 0){
        var color= "green";
      } 
      else {
        color= "white";
      }  
      L.circle([data[i].Lat,data[i].Lon], {
      fillOpacity: 0.20,
      color: color,
      fillColor: color,
      radius: data[i].Cases*10,
      }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Cases: " + data[i].Cases + "</h3>")
      .addTo(alldataLayer); 
     alldataLayer.addTo(map);  
  }
});
////////////////////////////// detailed  US/////////////////////////////////////////////
// Load in geojson data
  var detailconfirmedUrl= "https://api.covid19api.com/country/us/status/confirmed";
  var geojson;
  // Grab data with d3 CONFIRMED!!!!
  d3.json(detailconfirmedUrl , function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var color= "";
        if (data[i].Cases > 50000){
          var color= "red";
        }
        else if(data[i].Cases > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases > 5000){
          var color= "yellow";
        } 
        else if(data[i].Cases > 1000){
          var color= "purple";
        } 
        else if(data[i].Cases > 100){
          var color= "blue";
        } 
        else if(data[i].Cases > 0){
          var color= "green";
        } 
        else {
          color= "white";
        }  
        L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.20,
        color: color,
        fillColor: color,
        radius: data[i].Cases*10,
        }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
        .addTo(detailconfirmedLayer); 
        detailconfirmedLayer.addTo(map);  
    }
  });
  /////////////////////////////// U S//////////////////////////////////////////////////////////////
    // Load in geojson data
    var confirmedUrl= "https://api.covid19api.com/live/country/US/status/confirmed";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(confirmedUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
          .addTo(confirmedLayer); 
          confirmedLayer.addTo(map);  
      }
    });
    // Load in geojson data
    var deathsUrl= "https://api.covid19api.com/live/country/US/status/deaths";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(deathsUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*20,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Cases + "</h3>")
          .addTo(deathsLayer); 
          deathsLayer.addTo(map);  
      }
    });

    // Load in geojson data
    var recoveredUrl= "https://api.covid19api.com/live/country/US/status/recovered";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(recoveredUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Country + data[i].Province + "</h1> <hr> <h3>Recovered: " + data[i].Cases + "</h3>")
          .addTo(recoveredLayer); 
          recoveredLayer.addTo(map);  
      }
    });

    ////////////////////////////////////////////// Spain/////////////////////////////////////////////////////
    // Load in geojson data
    var confirmedUrl= "https://api.covid19api.com/live/country/spain/status/confirmed";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(confirmedUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
          .addTo(confirmedLayer); 
          confirmedLayer.addTo(map);  
      }
    });
    // Load in geojson data
    var deathsUrl= "https://api.covid19api.com/live/country/spain/status/deaths";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(deathsUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Cases + "</h3>")
          .addTo(deathsLayer); 
          deathsLayer.addTo(map);  
      }
    });

    // Load in geojson data
    var recoveredUrl= "https://api.covid19api.com/live/country/spain/status/recovered";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(recoveredUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Country + data[i].Province + "</h1> <hr> <h3>Recovered: " + data[i].Cases + "</h3>")
          .addTo(recoveredLayer); 
          recoveredLayer.addTo(map);  
      }
    });

//////////////////////////////// united-kingdom ///////////////////////////////////////////////
 // Load in geojson data
 var confirmedUrl= "https://api.covid19api.com/live/country/united-kingdom/status/confirmed";
 var geojson;
 // Grab data with d3 !!!!
 d3.json(confirmedUrl , function(data) {
   console.log(data);
   for (var i = 0; i < data.length; i++) {
       var color= "";
       if (data[i].Cases > 50000){
         var color= "red";
       }
       else if(data[i].Cases > 10000){
         var color= "orange";
       } 
       else if(data[i].Cases > 5000){
         var color= "yellow";
       } 
       else if(data[i].Cases > 1000){
         var color= "purple";
       } 
       else if(data[i].Cases > 100){
         var color= "blue";
       } 
       else if(data[i].Cases > 0){
         var color= "green";
       } 
       else {
         color= "white";
       }  
       L.circle([data[i].Lat,data[i].Lon], {
       fillOpacity: 0.20,
       color: color,
       fillColor: color,
       radius: data[i].Cases*10,
       }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
       .addTo(confirmedLayer); 
       confirmedLayer.addTo(map);  
   }
 });
 // Load in geojson data
 var deathsUrl= "https://api.covid19api.com/live/country/united-kingdom/status/deaths";
 var geojson;
 // Grab data with d3 !!!!
 d3.json(deathsUrl , function(data) {
   console.log(data);
   for (var i = 0; i < data.length; i++) {
       var color= "";
       if (data[i].Cases > 50000){
         var color= "red";
       }
       else if(data[i].Cases > 10000){
         var color= "orange";
       } 
       else if(data[i].Cases > 5000){
         var color= "yellow";
       } 
       else if(data[i].Cases > 1000){
         var color= "purple";
       } 
       else if(data[i].Cases > 100){
         var color= "blue";
       } 
       else if(data[i].Cases > 0){
         var color= "green";
       } 
       else {
         color= "white";
       }  
       L.circle([data[i].Lat,data[i].Lon], {
       fillOpacity: 0.20,
       color: color,
       fillColor: color,
       radius: data[i].Cases*10,
       }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Cases + "</h3>")
       .addTo(deathsLayer); 
       deathsLayer.addTo(map);  
   }
 });

 // Load in geojson data
 var recoveredUrl= "https://api.covid19api.com/live/country/united-kingdom/status/recovered";
 var geojson;
 // Grab data with d3 !!!!
 d3.json(recoveredUrl , function(data) {
   console.log(data);
   for (var i = 0; i < data.length; i++) {
       var color= "";
       if (data[i].Cases > 50000){
         var color= "red";
       }
       else if(data[i].Cases > 10000){
         var color= "orange";
       } 
       else if(data[i].Cases > 5000){
         var color= "yellow";
       } 
       else if(data[i].Cases > 1000){
         var color= "purple";
       } 
       else if(data[i].Cases > 100){
         var color= "blue";
       } 
       else if(data[i].Cases > 0){
         var color= "green";
       } 
       else {
         color= "white";
       }  
       L.circle([data[i].Lat,data[i].Lon], {
       fillOpacity: 0.20,
       color: color,
       fillColor: color,
       radius: data[i].Cases*10,
       }).bindPopup("<h1>" + data[i].Country + data[i].Province + "</h1> <hr> <h3>Recovered: " + data[i].Cases + "</h3>")
       .addTo(recoveredLayer); 
       recoveredLayer.addTo(map);  
   }
 });

 //////////////////////////////////// france//////////////////////////////////////////////////////////////

  // Load in geojson data
  var confirmedUrl= "https://api.covid19api.com/live/country/france/status/confirmed";
  var geojson;
  // Grab data with d3 !!!!
  d3.json(confirmedUrl , function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var color= "";
        if (data[i].Cases > 50000){
          var color= "red";
        }
        else if(data[i].Cases > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases > 5000){
          var color= "yellow";
        } 
        else if(data[i].Cases > 1000){
          var color= "purple";
        } 
        else if(data[i].Cases > 100){
          var color= "blue";
        } 
        else if(data[i].Cases > 0){
          var color= "green";
        } 
        else {
          color= "white";
        }  
        L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.20,
        color: color,
        fillColor: color,
        radius: data[i].Cases*10,
        }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
        .addTo(confirmedLayer); 
        confirmedLayer.addTo(map);  
    }
  });
  // Load in geojson data
  var deathsUrl= "https://api.covid19api.com/live/country/france/status/deaths";
  var geojson;
  // Grab data with d3 !!!!
  d3.json(deathsUrl , function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var color= "";
        if (data[i].Cases > 50000){
          var color= "red";
        }
        else if(data[i].Cases > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases > 5000){
          var color= "yellow";
        } 
        else if(data[i].Cases > 1000){
          var color= "purple";
        } 
        else if(data[i].Cases > 100){
          var color= "blue";
        } 
        else if(data[i].Cases > 0){
          var color= "green";
        } 
        else {
          color= "white";
        }  
        L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.20,
        color: color,
        fillColor: color,
        radius: data[i].Cases*10,
        }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Cases + "</h3>")
        .addTo(deathsLayer); 
        deathsLayer.addTo(map);  
    }
  });
 
  // Load in geojson data
  var recoveredUrl= "https://api.covid19api.com/live/country/france/status/recovered";
  var geojson;
  // Grab data with d3 !!!!
  d3.json(recoveredUrl , function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var color= "";
        if (data[i].Cases > 50000){
          var color= "red";
        }
        else if(data[i].Cases > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases > 5000){
          var color= "yellow";
        } 
        else if(data[i].Cases > 1000){
          var color= "purple";
        } 
        else if(data[i].Cases > 100){
          var color= "blue";
        } 
        else if(data[i].Cases > 0){
          var color= "green";
        } 
        else {
          color= "white";
        }  
        L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.20,
        color: color,
        fillColor: color,
        radius: data[i].Cases*10,
        }).bindPopup("<h1>" + data[i].Country + data[i].Province + "</h1> <hr> <h3>Recovered: " + data[i].Cases + "</h3>")
        .addTo(recoveredLayer); 
        recoveredLayer.addTo(map);  
    }
  });

//////////////////////////////italy//////////////////////////////////////////

  // Load in geojson data
  var confirmedUrl= "https://api.covid19api.com/live/country/italy/status/confirmed";
  var geojson;
  // Grab data with d3 !!!!
  d3.json(confirmedUrl , function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var color= "";
        if (data[i].Cases > 50000){
          var color= "red";
        }
        else if(data[i].Cases > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases > 5000){
          var color= "yellow";
        } 
        else if(data[i].Cases > 1000){
          var color= "purple";
        } 
        else if(data[i].Cases > 100){
          var color= "blue";
        } 
        else if(data[i].Cases > 0){
          var color= "green";
        } 
        else {
          color= "white";
        }  
        L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.20,
        color: color,
        fillColor: color,
        radius: data[i].Cases*10,
        }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
        .addTo(confirmedLayer); 
        confirmedLayer.addTo(map);  
    }
  });
  // Load in geojson data
  var deathsUrl= "https://api.covid19api.com/live/country/italy/status/deaths";
  var geojson;
  // Grab data with d3 !!!!
  d3.json(deathsUrl , function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var color= "";
        if (data[i].Cases > 50000){
          var color= "red";
        }
        else if(data[i].Cases > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases > 5000){
          var color= "yellow";
        } 
        else if(data[i].Cases > 1000){
          var color= "purple";
        } 
        else if(data[i].Cases > 100){
          var color= "blue";
        } 
        else if(data[i].Cases > 0){
          var color= "green";
        } 
        else {
          color= "white";
        }  
        L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.20,
        color: color,
        fillColor: color,
        radius: data[i].Cases*10,
        }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Cases + "</h3>")
        .addTo(deathsLayer); 
        deathsLayer.addTo(map);  
    }
  });
 
  // Load in geojson data
  var recoveredUrl= "https://api.covid19api.com/live/country/italy/status/recovered";
  var geojson;
  // Grab data with d3 !!!!
  d3.json(recoveredUrl , function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var color= "";
        if (data[i].Cases > 50000){
          var color= "red";
        }
        else if(data[i].Cases > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases > 5000){
          var color= "yellow";
        } 
        else if(data[i].Cases > 1000){
          var color= "purple";
        } 
        else if(data[i].Cases > 100){
          var color= "blue";
        } 
        else if(data[i].Cases > 0){
          var color= "green";
        } 
        else {
          color= "white";
        }  
        L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.20,
        color: color,
        fillColor: color,
        radius: data[i].Cases*10,
        }).bindPopup("<h1>" + data[i].Country + data[i].Province + "</h1> <hr> <h3>Recovered: " + data[i].Cases + "</h3>")
        .addTo(recoveredLayer); 
        recoveredLayer.addTo(map);  
    }
  });

  ///////////////////////////////// china ////////////////////////////////

    // Load in geojson data
    var confirmedUrl= "https://api.covid19api.com/live/country/china/status/confirmed";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(confirmedUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
          .addTo(confirmedLayer); 
          confirmedLayer.addTo(map);  
      }
    });
    // Load in geojson data
    var deathsUrl= "https://api.covid19api.com/live/country/china/status/deaths";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(deathsUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Cases + "</h3>")
          .addTo(deathsLayer); 
          deathsLayer.addTo(map);  
      }
    });
   
    // Load in geojson data
    var recoveredUrl= "https://api.covid19api.com/live/country/china/status/recovered";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(recoveredUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Country + data[i].Province + "</h1> <hr> <h3>Recovered: " + data[i].Cases + "</h3>")
          .addTo(recoveredLayer); 
          recoveredLayer.addTo(map);  
      }
    });
////////////////////////////////////////////germany//////////////////////////////////////

    // Load in geojson data
    var confirmedUrl= "https://api.covid19api.com/live/country/germany/status/confirmed";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(confirmedUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Confirmed: " + data[i].Cases + "</h3>")
          .addTo(confirmedLayer); 
          confirmedLayer.addTo(map);  
      }
    });
    // Load in geojson data
    var deathsUrl= "https://api.covid19api.com/live/country/germany/status/deaths";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(deathsUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Province + data[i].Country + "</h1> <hr> <h3>Deaths: " + data[i].Cases + "</h3>")
          .addTo(deathsLayer); 
          deathsLayer.addTo(map);  
      }
    });
   
    // Load in geojson data
    var recoveredUrl= "https://api.covid19api.com/live/country/germany/status/recovered";
    var geojson;
    // Grab data with d3 !!!!
    d3.json(recoveredUrl , function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
          var color= "";
          if (data[i].Cases > 50000){
            var color= "red";
          }
          else if(data[i].Cases > 10000){
            var color= "orange";
          } 
          else if(data[i].Cases > 5000){
            var color= "yellow";
          } 
          else if(data[i].Cases > 1000){
            var color= "purple";
          } 
          else if(data[i].Cases > 100){
            var color= "blue";
          } 
          else if(data[i].Cases > 0){
            var color= "green";
          } 
          else {
            color= "white";
          }  
          L.circle([data[i].Lat,data[i].Lon], {
          fillOpacity: 0.20,
          color: color,
          fillColor: color,
          radius: data[i].Cases*10,
          }).bindPopup("<h1>" + data[i].Country + data[i].Province + "</h1> <hr> <h3>Recovered: " + data[i].Cases + "</h3>")
          .addTo(recoveredLayer); 
          recoveredLayer.addTo(map);  
      }
    });

