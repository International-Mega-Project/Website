function getUVIndex() {
    var lat = 52.946034;
    var lng = -1.139356;


    $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('x-access-token', '6756ecb3ebdab1e6478f6c18028c83c0');
        },
        url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng,
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            // handle error response
        }
    });
}