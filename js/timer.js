const State = {
    none : 0,
    pomodoro : 1,
    rest : 2,
    pre_pomodoro: 3,
    pre_rest: 4
}
const POMODORO_MINUTES = 25;
const REST_MINUTES = 5;

let gState = State.pre_pomodoro;
let endDate = new Date();
let gMinutes = 0;
let gSeconds = 0;

window.onload = function() {
    window.setInterval(timer, 100);
}

function timer() {
    if (changeState()) {
        return;
    }
    let diffSenonds = calcDiffSeconds();
    if (diffSenonds <= 0) {
        if (gState == State.pomodoro) {
            gState = State.pre_rest;
            return;
        }
        if (gState == State.rest) {
            gState = State.pre_pomodoro;
            return;
        }
        console.log("invalid state");
        return;
    }
    let nowDate = new Date();
    let deltaMinutes = Math.trunc(diffSenonds / 60)
    let deltaSeconds = diffSenonds - (deltaMinutes * 60)
    // console.log(deltaMinutes + ":" + deltaSeconds);
    let mString = ('00' + deltaMinutes).slice(-2);
    let sString = ('00' + deltaSeconds).slice(-2);

    let item = document.getElementById("timer");
    item.textContent = mString + ":" + sString;
    return;
}

function changeState() {
    if (gState == State.pre_pomodoro) {
        let nowDate = new Date();
        nowDate.setMinutes(nowDate.getMinutes() + POMODORO_MINUTES);
        endDate = nowDate;
        gState = State.pomodoro;
        setStateString("POMODORO", "red");
        console.log("Set End Date(Pomodoro): " + endDate);
        return true;
    }
    if (gState == State.pre_rest) {
        let nowDate = new Date();
        nowDate.setMinutes(nowDate.getMinutes() + REST_MINUTES);
        endDate = nowDate;
        gState = State.rest;
        setStateString("REST", "blue");
        console.log("Set End Date(Rest): " + endDate);
        return true;
    }
    return false;
}

function calcDiffSeconds() {
    let nowDate = new Date();
    let diffMilliSec = endDate - nowDate;
    return Math.trunc(diffMilliSec / 1000);
}

function setStateString(stateString, colorString) {
    let item = document.getElementById("pomodoro_state");
    item.textContent = stateString;
    item.style.color = colorString;
}