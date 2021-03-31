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
    console.log(array[0].place_name);
    document.getElementById('mapformaddress').innerHTML = array[0].place_name;
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