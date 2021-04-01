function getInformation() {
    console.log("Lat: " + document.getElementById('mapLat').innerHTML + "  Long: " + document.getElementById('mapLong').innerHTML);
    var lat = document.getElementById('mapLat').innerHTML;
    var lng = document.getElementById('mapLong').innerHTML;
    var alt = $('#alt').val();
    var ozone = $('#ozone').val();
    var dt = $('#dt').val();

    $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('x-access-token', '6756ecb3ebdab1e6478f6c18028c83c0');
        },
        url: 'https://api.openuv.io/api/v1/forecast?lat=' + lat + '&lng=' + lng + '&alt=' + alt + '&ozone=' + ozone + '&dt=' + dt,
        success: function (response) {
            //handle successful response
        },
        error: function (response) {
            // handle error response
        }
    });
}