let long = '51.094791';
let lat ='5.793970';

function getWeatherData() {
    axios({
        method: 'get',
        url: 'https://v1.nocodeapi.com/jordivhw/ow/tsTdEvkyScufqCGI/byGeoCord/threeHourForecast',
        params: {lat: lat,long: long},
    }).then(function (response) {
        // handle success
        console.log(response.data);
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
}

