mapboxgl.accessToken = 'pk.eyJ1IjoicnVhbmp2djIzIiwiYSI6ImNra3pzdnNjNDBtcm4ycHFvcGticGxnNmgifQ.ycPq0Fz2eyZlaRgTle9NQg';

// let lat;
// let long;
// let neededDataForMl = [];

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

function getWeatherData() {
    axios({
        method: 'get',
        url: 'https://v1.nocodeapi.com/jordivhw/ow/tsTdEvkyScufqCGI/byGeoCord/threeHourForecast',
        //TODO: uncomment next line to use the mapinfo for weather data
        //params: {lat: lat,long: long},
        //TODO: put next line in comment to the mapinfo for weather data --> that building karina asked for
        params: { lat: 52.946034, long: -1.139356 }
    }).then(function(response) {
        // handle success
        makeChart(response.data);
    }).catch(function(error) {
        // handle error
        window.alert(error);
    })
}

function makeChart(data) {
    let label_tempArray = getTemperatures(data);

    const ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label_tempArray[0],
            datasets: [{
                label: data.city.name,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHitRadius: 10,
                data: label_tempArray[1],
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a degree sign in the ticks
                        callback: function(value, index, values) {
                            return value + "°C";
                        }
                    }
                }]
            }
        }
    });
    getUVIndex(data);
}

function getUVIndex(dataWeather) {
    // TODO: delete next 2 lines if you want the position of mapbox
    lat = 52.946034;
    lng = -1.139356;
    console.log("tried");

    $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function(request) {
            request.setRequestHeader('x-access-token', '6756ecb3ebdab1e6478f6c18028c83c0');
        },
        url: 'https://api.openuv.io/api/v1/forecast?lat=' + lat + '&lng=' + lng,
        success: function(response) {
            getUvIndexTomorrow(response.result, dataWeather);
        },
        error: function(response) {
            console.log("failed");
            window.alert(response.message);
        }
    });


}

function getUvIndexTomorrow(uvInfoToday, dataWeather) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // TODO: delete next 2 lines if you want the position of mapbox
    lat = 52.946034;
    lng = -1.139356;

    $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function(request) {
            request.setRequestHeader('x-access-token', '6756ecb3ebdab1e6478f6c18028c83c0');
        },
        url: 'https://api.openuv.io/api/v1/forecast?lat=' + lat + '&lng=' + lng + '&dt=' + tomorrow.toISOString(),
        success: function(response) {
            let uvTomorrow = response.result;
            uvTomorrow.forEach(u => {
                uvInfoToday.push(u);
            });
            // TODO: put next line in comment to stop downloading CSV file when clicking "weather data"
            makeCsvFromWeatherAndUv(uvInfoToday, dataWeather);
        },
        error: function(response) {
            window.alert(response.message);
        }
    });
}

function makeCsvFromWeatherAndUv(uvData, weatherData) {
    neededDataForMl = [];
    for (i = 0; i <= 16; i++) {
        w = weatherData.list[i];
        let date = w.dt_txt;
        let temp_max = (w.main.temp_max - 273.15).toFixed(2);
        let temp_min = (w.main.temp_min - 273.15).toFixed(2);
        let pressure = w.main.pressure;
        let SunPositionAltitude = "unknown";
        let SunPositionAzimuth = "unknown";
        let Uv = 0;
        let apiReturned = 0;
        uvData.forEach(u => {
            let Time = u.uv_time;
            let splitDateTime = Time.split("T");
            let splitTime = splitDateTime[1].split(":");
            let splitTimeMin = parseInt(splitTime[0]);
            if (parseInt(splitTime[1]) >= 30) {
                splitTimeMin += 1;
                splitTime[0] = splitTimeMin;
            }
            let myDateTime = splitDateTime[0] + " " + splitTime[0] + ":00:00"
            if (myDateTime == date) {
                SunPositionAltitude = u.sun_position.altitude;
                SunPositionAzimuth = u.sun_position.azimuth;
                Uv = u.uv;
            }
        })
        if (SunPositionAltitude != "unknown") {
            apiReturned = 1;
        }
        neededDataForMl.push({
            date,
            temp_min,
            temp_max,
            pressure,
            SunPositionAltitude,
            SunPositionAzimuth,
            Uv,
            apiReturned
        })
    }
}

function getTemperatures(data) {
    let arrayTemps = [];
    let arrayLabels = [];
    for (i = 0; i <= 8; i++) {
        arrayTemps.push(data.list[i].main.temp - 273.15);
        let label = data.list[i].dt_txt
        arrayLabels.push(label.substr(label.length - 8, 5));
    }
    array = [arrayLabels, arrayTemps];
    return array;
}

function downloadCsv() {

    let capacity = document.getElementById("solarPanelCapacityRange").value;
    // TODO: uncomment these 2 if we want consumption
    // let consumptionDay = document.getElementById("solarPanelConsumptionDay").value;
    // let consumptionNight = document.getElementById("solarPanelConsumptionNight").value;
    let orientation_value = document.getElementById("solarPanelOrientation").value;
    console.log(orientation_value);
    let orientation = "NOT SET";
    switch (orientation_value) {
        case "1":
            orientation = "NORTH";
            break;
        case "2":
            orientation = "NORTH_EAST"
            break;
        case "3":
            orientation = "NORTH_SOUTH"
            break;
        case "4":
            orientation = "NORTH_WEST"
            break;
        case "5":
            orientation = "EAST"
            break;
        case "6":
            orientation = "EAST_SOUTH"
            break;
        case "7":
            orientation = "EAST_WEST"
            break;
        case "8":
            orientation = "SOUTH"
            break;
        case "9":
            orientation = "SOUTH_WEST"
            break;
        case "10":
            orientation = "WEST"
            break;
        default:
            orientation = "NOT SET";
    }
    console.log(orientation);
    let pitch = document.getElementById("solarPanelPitch").value;
    let panelAzimuth = document.getElementById("solarPanelazimuth").value;
    neededDataForMl.forEach(d => {
        d["capacity"] = capacity;
        // TODO: uncomment these 2 if we want consumption
        // d["consumptionDay"] = consumptionDay;
        // d["consumptionNight"] = consumptionNight;
        d["orientation"] = orientation;
        d["pitch"] = pitch;
        d["panelAzimuth"] = panelAzimuth;
    })
    const items = neededDataForMl;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'allData.csv';
    hiddenElement.click();
}

function use() {

    //21 Queen's Road, Nottingham, NG2 3BE, United Kingdom for building location
    let mapLat = document.getElementById("mapLat").textContent;
    let mapLong = document.getElementById("mapLong").textContent;
    axios({
        method: 'get',
        url: 'https://api.weatherbit.io/v2.0/forecast/hourly?lat=' + mapLat + '&lon=' + mapLong + '&key=c5f7c576b31747f99a3ed88f16ae9678&hours=24',
    }).then(function(response) {
        // handle success
        var datacollection = response.data
        dowloadWeatherBitDataAsCSV(datacollection);
    }).catch(function(error) {
        // handle error
        window.alert(error);
    })
}

function dowloadWeatherBitDataAsCSV(collection) {
    let weatherData = [];
    for (let index = 0; index < collection.data.length; index++) {
        let lat = collection.lat;
        let long = collection.lon;
        let dateTime = collection.data[index].datetime;
        let clouds = collection.data[index].clouds;
        let ozone = collection.data[index].ozone;
        let presure = collection.data[index].pres;
        let snow = collection.data[index].snow;
        let solarRadiation = collection.data[index].solar_rad;
        let temp = collection.data[index].temp;
        let uv = collection.data[index].uv;
        let weatherDescription = collection.data[index].weather.description;
        let weatherCode = collection.data[index].weather.code;
        weatherData.push({ lat, long, dateTime, clouds, ozone, presure, snow, solarRadiation, temp, uv, weatherDescription, weatherCode });
    }
    const items = weatherData
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'WeatherData.csv';
    hiddenElement.click();
    //console.log(csv);
}