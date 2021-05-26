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
function MakeMyChart(data)
{
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
          backgroundColor: 'rgba(194, 70, 111,0.50)',
          borderColor: 'rgb(199, 18, 78)',
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
}

function use() {

    //21 Queen's Road, Nottingham, NG2 3BE, United Kingdom for building location
    let mapLat = document.getElementById("mapLat").textContent;
    let mapLong = document.getElementById("mapLong").textContent;
    axios({
        method: 'get',
        url: 'https://api.weatherbit.io/v2.0/forecast/hourly?lat=' + mapLat + '&lon=' + mapLong + '&key=c5f7c576b31747f99a3ed88f16ae9678&hours=24',
    }).then(function(response) {
        var JsonData = JsonAddition(response.data)
        JsonAddition(JsonData)
        MakeMyChart(JsonData.data)
    }).catch(function(error) {
        window.alert(error);
    })
}

function JsonAddition(jsonOririnal)
{
    jsonOririnal.UserInput = 
    {
        solarCapacity: document.getElementById("solarPanelCapacityRange").value,
        solarOrientation: getOrientationName(document.getElementById("solarPanelOrientation").value),
        solarAzimuth: document.getElementById("solarPanelazimuth").value,
        solarPitch: document.getElementById("solarPanelPitch").value
    };
    return jsonOririnal;
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