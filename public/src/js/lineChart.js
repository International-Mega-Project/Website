const ctx = document.getElementById('myChart');
let now = new Date();

if(parseInt(now.getMinutes()) <30) {
    now.setMinutes(30);
} else {
    now.setMinutes(0);
    now.setHours(now.getHours() +1);

}

function getHours() {
    now.setHours(now.getHours() + 3);
    return now.getHours() -3;

}

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [getHours() +":" + now.getMinutes(), getHours() +":" + now.getMinutes(), getHours()  +":" + now.getMinutes(), getHours()  +":" + now.getMinutes(), getHours()  +":" + now.getMinutes(),
            getHours()  +":" + now.getMinutes(), getHours()  +":" + now.getMinutes(), getHours()  +":" + now.getMinutes(), getHours()  +":" + now.getMinutes()],
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
