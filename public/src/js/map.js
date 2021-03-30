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


geocoder.on('results', function (results) {
    console.log(results);
})
