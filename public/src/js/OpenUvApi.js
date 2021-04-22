function getUVIndex() {
    var lat = 52.946034;
    var lng = -1.139356;
    var array = [];

    $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function(request) {
            request.setRequestHeader('x-access-token', '6756ecb3ebdab1e6478f6c18028c83c0');
        },
        //url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng,
        //https://api.openuv.io/api/v1/forecast?lat=-31.1&lng=56.4
        url: 'https://api.openuv.io/api/v1/forecast?lat=' + lat + '&lng=' + lng,
        success: function(response) {
            var collection = response.result;

            console.log(collection);
            //array.push(["SunPositionAltitude", "SunPositionAzimuth", "Uv", "UvTime"])

            console.log(array);

            dowloadUvDataAsCSV(collection);
        },
        error: function(response) {
            // handle error response
        }
    });
}

function dowloadUvDataAsCSV(collection) {
    let uvArray = [];
    for (let index = 0; index < collection.length; index++) {
        let SunPositionAltitude = collection[index].sun_position.altitude;
        let SunPositionAzimuth = collection[index].sun_position.azimuth;
        let Uv = collection[index].uv;
        let Time = collection[index].uv_time;
        let splitDateTime = Time.split("T");
        let splitTime = splitDateTime[1].split(":");
        let splitTimeMin = parseInt(splitTime[0]);
        if (parseInt(splitTime[1]) >= 30) {
            splitTimeMin += 1;
            splitTime[0] = splitTimeMin;
        }
        let myDateTime = splitDateTime[0] +" "+splitTime[0]+":00:00"
        //let DateTimeSplitString = DateTime.split("T")
        //console.log("date: " + DateTimeSplitString[0])
        //console.log("time: " + DateTimeSplitString[1])
        uvArray.push({ SunPositionAltitude, SunPositionAzimuth, Uv, myDateTime });
    }
    const items = uvArray
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'UvData.csv';
    hiddenElement.click();
    console.log(csv);
}