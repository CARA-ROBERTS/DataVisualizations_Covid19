var url = "https://api.covid19api.com/summary";

d3.json(url, function(data){
    var countries = Object.values([data.Countries[10].TotalConfirmed]);
});

d3.json(url, function(data){
    // var countries = Object.values([data.Countries[i].TotalConfirmed]);
    var sumConfirmed = 0;
    var sumRecovered = 0;
    var sumDeaths = 0;

    for (var i=0; i < (data.Countries).length; i++){
        
        // console.log(confirmed);
        sumConfirmed += +Object.values([data.Countries[i].TotalConfirmed]);
        sumRecovered += +Object.values([data.Countries[i].TotalRecovered]);
        sumDeaths += +Object.values([data.Countries[i].TotalDeaths]);
    }
    
    mortalityRate = (sumDeaths/sumConfirmed)*100;

    // tbody.append("tr").append("td").text(sumConfirmed);
    document.getElementById("totconf").innerHTML = sumConfirmed;
    document.getElementById("totrec").innerHTML = sumRecovered;
    document.getElementById("totdeaths").innerHTML = sumDeaths;
    document.getElementById("mortrate").innerHTML = mortalityRate.toPrecision(3)+"%";

    console.log(sumConfirmed);
    console.log(sumRecovered);
    console.log(sumDeaths);
    console.log(mortalityRate);

});

// var tbody = d3.select("tbody")

// function tableCreate (data) {
//     var row = tbody.append("tr");
//     var cell = row.append("td");
//     cell.text(sumConfirmed);
// }