mapboxgl.accessToken = 'pk.eyJ1IjoicnVhbmp2djIzIiwiYSI6ImNra3pzdnNjNDBtcm4ycHFvcGticGxnNmgifQ.ycPq0Fz2eyZlaRgTle9NQg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-79.4512, 43.6568],
    zoom: 13
});


var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

map.addControl(geocoder);


geocoder.on('results', function(response) {
    console.log(response.request.response.body.features);
    var array = response.request.response.body.features;
    var coordinates = array[0].geometry.coordinates;
    lat = coordinates[1];
    long = coordinates[0];
    document.getElementById('mapLat').innerHTML = lat;
    document.getElementById('mapLong').innerHTML = long;
})

makePredictionChart(null);

function MakeMyChart(data) {
    console.log(data);
    var labels = [];
    var temps = [];
    for (let index = 0; index < data.length; index++) {
        var timedate = data[index].datetime.split(":");
        labels.push(timedate[1] + ":00");
        temps.push(data[index].temp)
    }
    var data = {
        labels: labels,
        datasets: [{
            label: 'Temp',
            backgroundColor: 'rgba(80, 158, 41,0.50)',
            borderColor: 'rgb(80, 158, 41)',
            data: temps,
        }]
    };
    const config = {
        type: 'line',
        data,
        options: {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    makePredictionChart(null);
}

function use() {

    //21 Queen's Road, Nottingham, NG2 3BE, United Kingdom for building location
    let mapLat = document.getElementById("mapLat").textContent;
    let mapLong = document.getElementById("mapLong").textContent;
    if (!ISUserRangeValid()) {
        return false;
    }
    axios({
        method: 'get',
        url: 'https://api.weatherbit.io/v2.0/forecast/hourly?lat=' + mapLat + '&lon=' + mapLong + '&key=2653d8f9fed84bf7b46ddad6d58cb9af&hours=24',
    }).then(function(response) {
        var JsonData = JsonAddition(response.data);
        MakeMyChart(JsonData.data);
        testApi(JsonData);
    }).catch(function(error) {
        window.alert(error);
    })

    return false;
}

function JsonAddition(jsonOriginal) {
    jsonOriginal.UserInput = {
        solarCapacity: document.getElementById("solarPanelCap").value,
        solarOrientation: getOrientationName(document.getElementById("solarPanelOrientation").value),
        solarAzimuth: document.getElementById("solarPanelazimuth").value,
        solarPitch: document.getElementById("solarPanelPitch").value
    };
    return jsonOriginal;
}

function getOrientationName(input) {
    let myorientationuse = input + "";
    let orientationName = "";
    switch (myorientationuse) {
        case "1":
            orientationName = "North";
            break;
        case "2":
            orientationName = "North East";
            break;
        case "3":
            orientationName = "East";
            break;
        case "4":
            orientationName = "South East";
            break;
        case "5":
            orientationName = "South";
            break;
        case "6":
            orientationName = "South West";
            break;
        case "7":
            orientationName = "West";
            break;
        case "8":
            orientationName = "North West";
            break;
        default:
            orientationName = "NotSelected";
    }
    return orientationName
}

function makePredictionChart(input) {
    var labels = [];
    var providedPower = [];
    if (input == null) {
        labels = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];
        providedPower = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    } else {
        for (var key in input) {
            if (input.hasOwnProperty(key)) {
                labels.push(key);
                providedPower.push(input[key]);
            }
        }
    }
    var data = {
        labels: labels,
        datasets: [{
            label: 'Results',
            backgroundColor: 'rgba(80, 158, 41,0.50)',
            data: providedPower,
        }]
    };
    const config = {
        type: 'line',
        data,
        options: {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    var predictionChart = new Chart(
        document.getElementById('predictionChart'),
        config
    );
}

function testApi(input) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(input),
        redirect: 'follow'
    };

    fetch("http://localhost:8000/api/postdata", requestOptions)
        .then(response => response.json())
        .then(result => makePredictionChart(result))
        .catch(error => console.log('error', error));
}

function ISUserRangeValid() {
    if (document.getElementById("solarPanelPitch").value <= 0) {
        alert("Please insure that panel pitch is greater than 0");
        return false
    }
    if (isNaN(document.getElementById("solarPanelazimuth").value) || document.getElementById("solarPanelazimuth").value.trim().length <= 0) {
        alert("Please insure that panel azimuth is a number");
        return false
    }
    if (isNaN(document.getElementById("solarPanelCap").value) || document.getElementById("solarPanelazimuth").value.trim().length <= 0) {
        alert("Please insure that panel capacity is a number");
        return false
    }
    return true
}