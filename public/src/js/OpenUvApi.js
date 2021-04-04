function getUVIndex() {
    var lat = document.getElementById('mapLat').innerHTML;
    var lng = document.getElementById('mapLong').innerHTML;

    $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('x-access-token', '6756ecb3ebdab1e6478f6c18028c83c0');
        },
        url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng,
        success: function (response) {
            //handle successful response
        },
        error: function (response) {
            // handle error response
        }
    });
}