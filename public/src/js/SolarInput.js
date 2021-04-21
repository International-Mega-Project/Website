function DisplayPitchValue(input) {
    document.getElementById("solarPanelpitch").innerHTML = "Solar panel pitch: " + input + "&#176";
}

function DisplayCapatityValue(input) {
    document.getElementById("solarpanelCapacity").innerHTML = "Solar panel installed capacity: " + input + "kWh";
}

function ChangeProductionRange(input) {
    if (input == 1) {
        document.getElementById("solarPanelCapacityRange").disabled = false;
        document.getElementById("solarPanelCapacityRange").min = 0;
        document.getElementById("solarPanelCapacityRange").max = 100;

    }
    if (input == 2) {
        document.getElementById("solarPanelCapacityRange").disabled = false;
        document.getElementById("solarPanelCapacityRange").min = 101;
        document.getElementById("solarPanelCapacityRange").max = 200;
    }
    if (input == 0) {
        document.getElementById("solarPanelCapacityRange").disabled = true;
    }
}