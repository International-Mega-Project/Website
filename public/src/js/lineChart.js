const ctx = document.getElementById('myChart');
let now = new Date();
let hourNow = now.getHours();
let minutenow = now.getMinutes();

if(minutenow<30) {
    minutenow = "30";
} else {
    minutenow = "00";
    hourNow++;
}

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [hourNow +":" + minutenow, (hourNow +3)  +":" + minutenow, (hourNow +6)  +":" + minutenow, (hourNow +9)  +":" + minutenow, (hourNow +12)  +":" + minutenow,
            (hourNow +15)  +":" + minutenow, (hourNow +18)  +":" + minutenow, (hourNow +21)  +":" + minutenow, (hourNow +24)  +":" + minutenow],
        datasets: [
            {
                label: "My First dataset",
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
                data: [65, 59, 80, 81, 56, 55, 40, 50, 65],
            }
        ]}
});
