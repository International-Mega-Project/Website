mapboxgl.accessToken = 'pk.eyJ1IjoicnVhbmp2djIzIiwiYSI6ImNra3pzdnNjNDBtcm4ycHFvcGticGxnNmgifQ.ycPq0Fz2eyZlaRgTle9NQg';

let lat;
let long;

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


geocoder.on('results', function (response) {
    var  array = response.request.response.body.features;
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
        params: {lat: lat,long: long},
    }).then(function (response) {
        // handle success
        makeChart(response.data);
    }).catch(function (error) {
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
            datasets: [
                {
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
                }
            ]},
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + "°C";
                        }
                    }
                }]
            }
        }
    });
}

function getTemperatures(data) {
    let arrayTemps = [];
    let arrayLabels = [];
    for(i=0;i<=8;i++) {
        arrayTemps.push(data.list[i].main.temp - 273.15);
        let label = data.list[i].dt_txt
        arrayLabels.push(label.substr(label.length - 8,5));
    }
    array = [arrayLabels, arrayTemps];
    return array;
}






