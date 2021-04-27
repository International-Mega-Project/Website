function DisplayPitchValue(input) {
    document.getElementById("solarPanelPitchLabel").innerHTML = "Solar panel pitch: " + input + "&#176";
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

function DisplayConsumptionValueDay(input) {
    document.getElementById("solarPanelConsumptionLabelDay").innerHTML = "Average consumption a day: " + input + "kWh";
}

function ChangeConsumptionRangeDay(input) {
    const dayConsumtion = document.getElementById("solarPanelConsumptionDay");
    dayConsumtion.step = 0.1;
    if (input == 1) {
        dayConsumtion.disabled = false;
        dayConsumtion.min = 0;
        dayConsumtion.max = 5;

    }
    if (input == 2) {
        dayConsumtion.disabled = false;
        dayConsumtion.min = 5;
        dayConsumtion.max = 10;
    }
    if (input == 3) {
        dayConsumtion.disabled = false;
        dayConsumtion.min = 10;
        dayConsumtion.max = 15;
    }
    if (input == 0) {
        document.getElementById("solarPanelConsumptionRangeDay").disabled = true;
    }
}

function ChangeConsumptionRangeNight(input) {
    const nightConsumtion = document.getElementById("solarPanelConsumptionNight");
    nightConsumtion.step = 0.1;
    if (input == 1) {
        nightConsumtion.disabled = false;
        nightConsumtion.min = 0;
        nightConsumtion.max = 7;

    }
    if (input == 2) {
        nightConsumtion.disabled = false;
        nightConsumtion.min = 7;
        nightConsumtion.max = 14;
    }
    if (input == 3) {
        nightConsumtion.disabled = false;
        nightConsumtion.min = 14;
        nightConsumtion.max = 20;
    }
    if (input == 0) {
        document.getElementById("solarPanelConsumptionRangeNight").disabled = true;
    }
}

function DisplayConsumptionValueNight(input) {
    document.getElementById("solarPanelConsumptionLabelNight").innerHTML = "Average consumption per night: " + input + "kWh";
}
