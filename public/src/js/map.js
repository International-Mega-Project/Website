//TODO: const axios = require('axios');

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
    lat = coordinates[0];
    long = coordinates[1];
    console.log(array[0]);
    document.getElementById('mapStreetNumber').innerHTML = array[0].address;
    document.getElementById('mapStreetName').innerHTML = array[0].text;
    document.getElementById('mapCity').innerHTML = array[0].context[2].text;
    document.getElementById('mapCountry').innerHTML = array[0].context[4].text;
    document.getElementById('mapLongLat').innerHTML = "Lat: "+array[0].center[0] + "  ,  Long: " + array[0].center[1];
})

function getWeatherDataButtonClick() {
    //TODO: axios is not defined because i can't "require" it at line 1?
    fetch({
        method: 'GET',
        url: 'https://v1.nocodeapi.com/jordivhw/ow/plqXjzrWGqJksYSi/byGeoCord/threeHourForecast',
        params: {lat: lat,long: long},
    }).then(function (response) {
        // handle success
        console.log(response.data);
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
}