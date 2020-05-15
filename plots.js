/**
 * Helper function to select data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Country
 * index 1 - Province
 * index 2 - Lat
 * index 3 - Lon
 * index 4 - Date
 * index 5 - Cases
 * index 5 - Status
 */

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var country = d3.select("#countryInput").node().value;
  console.log(country);

  // clear the input value
  d3.select("#countryInput").node().value = "";

  // Build the plot with the new country
  buildPlot(country);
}

function buildPlot(country) {
 
  var url = `https://api.covid19api.com/country/${country}/status/confirmed`
  
  
  d3.json(url).then(function(data) {
  
    // Creating empty lists for cases_unique and dateArray
    var cases_unique = [];
    var dateArray = [];  

    // Grab values from the response json object to build the plots
    // Here, I am summin all confirmed cases across different regions by date
    
    $.each(data, function () {
    
    // Easiest way to get data in a "simple" date format
      var date_unique = new Date(this.Date).toISOString().replace(/T/, ' ').split(' ')[0];
            var index = dateArray.indexOf(date_unique);
    
    // The below IF statement is used to sum up all the cases for each country by date.
    // This plays an important role in all countries that have multiple provinces.
          
      if (index == -1) {
          dateArray.push(date_unique);
          var obj = {Country: this.Country, Date: date_unique, Cases: this.Cases};
          cases_unique.push(obj);
      }
      else {
          cases_unique[index].Cases += this.Cases;
      }
    });

    
    // console.log(cases_unique);
    var date = cases_unique.map(item => item.Date );
    var cases = cases_unique.map(item => item.Cases);
    var ccountry = cases_unique.map(item => item.Country);
   
    // Taking a closer look at the data from the api, I've noticed that sometimes
    // we have some Provinces that are double counted (some with lat and lon data, some not), 
    // leading to non-monotone plots
    // To fix this, I've done this loop that fix this issue, enforcing plot is always monotone.
    // This is not 100% accurate though, as I am replacing today's # of confirmed cases with tomorrow's
    // number of confirmed cases if today is > than tomorrow (which is the case that monotonicity is violated)
    // I've double checked this in some specific examples in the US by hand, and this fix the "data cleaning" part.
    // in a correct manner. 
    for (var i=0; i<cases.length; i++){
      if (cases[i]>cases[i+1]){
        cases[i] = cases[i+1];
      }
    }

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: country,
      x: date,
      y: cases,
    
      line: {
        color: "blue"
      }
    };

    var data = [trace1];

    var layout = {
      title: `Confirmed COVID-19 cases in ${ccountry[0]} `,
      xaxis: {
        autorange: true,
        type: "date",
        title: 'Timeline',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 18,
          color: 'grey'
        }
      },
      yaxis: {
        rangemode: 'nonnegative',
        zeroline: true,
        autorange: true,
        type: "log",
        title: 'Number of Cases',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 18,
          color: 'grey'
        }
      }
    };

    Plotly.newPlot("plot", data, layout);

  }
  );
}

// Add event listener for submit button
d3.select("#submit").on("click || enter", handleSubmit);


    