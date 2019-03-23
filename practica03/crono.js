'use strict'
//status = 1 --> stopped
//status = 2 --> running
let status;
let btns = ["s", "p", "r"];
let million = Math.pow(10, 6);
let overflow = 8.64 * Math.pow(10, 7)-1; // 23:59:59:99 hours in ms
let debug = false; //just switch between true or false for debugging

function sleep(x) {
    let first = new Date();
    let actual;
    let diff;
    while (true) {
        actual = new Date();
        diff = actual - first;
        if (diff === (x*1000)) {
            return;
        }
    }
}

function formatTime(crono) {
    if (crono.hour < 10) {
        crono.hour = "0"+crono.hour;
    }
    if (crono.minutes < 10) {
        crono.minutes = "0"+crono.minutes;
    }
    if (crono.seconds < 10) {
        crono.seconds = "0"+crono.seconds;
    }
    if (crono.milliseconds < 10) {
        crono.milliseconds = "0"+crono.milliseconds;
    }
}

function timeConverter(crono) { //convert ms to readable time
    if (debug) {
        console.log("Dentro de timeConverter");
    }
    let aux;
    if (!Number.isNaN(crono.diff)) {
        crono.hour = Math.floor(crono.diff/(3.6*million));
        crono.minutes = Math.floor((crono.diff%(3.6*million))/60000);
        crono.seconds = Math.floor(((crono.diff%(3.6*million))%60000)/1000);
        crono.milliseconds = Math.floor((crono.diff%1000)/100);
        formatTime(crono);
        crono.display = crono.hour + ":" + crono.minutes + ":" + crono.seconds +":" + crono.milliseconds;

        if (debug) {
            console.log("in function timeConverter: diff = ", crono.diff);
            console.log("in function timeConverter: Horas", crono.hour);
            console.log("in function timeConverter: Minutos", crono.minutes);
            console.log("in function timeConverter: Segundos", crono.seconds);
            console.log("in function timeConverter: Milisegundos:", crono.milliseconds);
            console.log("in function timeConverter: display:", crono.display);
        }
    }
}

function btnStartStop(crono) {
    if (debug) {
        console.log("Dentro de StartStop");
    }
    switch (status) {
        case 1:
            //(re)starting crono
            if (crono.start === null) {
                crono.start = new Date().getTime();
            }
            status = 2;
            return crono;
        case 2:
            //stopping crono
            crono.actual = new Date().getTime();
            status = 1;
            return crono;
        default:
            return crono;
    }
}

function status1(tecla, crono) {
    let showtime = {};
    switch (tecla) {
        case btns[0]:
            btnStartStop(crono);
            if (debug) {
                console.log("in fuction status1: Has pulsado boton start/stop");
                console.log("in fuction status1: stopped: start/stop: crono.start", crono.start);
                console.log("in fuction status1: stopped: start/stop: crono.actual", crono.actual);
            }
            crono.diff = crono.actual - crono.start;
            timeConverter(crono);
            break;
        case btns[1]:
            //Nothing to do here...
            if (debug) {
                console.log("in fuction status1: stopped: Has pulsado boton partial");
            }
            break;
        case btns[2]:
            if (debug) {
                console.log("in fuction status1: stopped: Has pulsado boton reset");
            }
            crono.display = "00:00:00:00";
            crono.start = null;
            crono.partials = [];
            break;
        default:
            console.log("in fuction status1: Error: boton", tecla, "no encontrado");
    }
    showtime.display = crono.display;
    if (crono.diff >= overflow) {
        showtime.display = "overflow";
    }
    showtime.partials = crono.partials;
    if (debug) {
        console.log("in fuction status1: showtime.display:", showtime.display);
        console.log("in fuction status1: showtime.partials:", showtime.partials);
    }
    return showtime;
}

function status2(tecla, crono) {
    let showtime = {};
    switch (tecla) {
        case btns[0]:
            btnStartStop(crono);
            if (debug) {
                console.log("in fuction status2: Has pulsado boton start/stop");
                console.log("in fuction status2: running: start/stop: crono.start:", crono.start);
                console.log("in fuction status2: running: start/stop: crono.actual:", crono.actual);
            }
            crono.diff = crono.actual - crono.start;
            timeConverter(crono);
            break;
        case btns[1]:
            crono.actual = new Date().getTime();
            crono.diff = crono.actual - crono.start;
            timeConverter(crono);
            crono.partials.push(crono.display);
            crono.start = crono.actual; //update new starting time
            if (debug) {
                console.log("in fuction status2: Has pulsado boton partial");
                console.log("in fuction status2: running: partial: crono.start:", crono.start);
                console.log("in fuction status2: running: partial: crono.actual:", crono.actual);
            }
            break;
        case btns[2]:
            //Nothing to do here...
            if (debug) {
                console.log("in fuction status2: running: Has pulsado boton reset");
            }
            break;
        default:
            console.log("in fuction status2: Error: boton", tecla, "no encontrado");
    }
    showtime.display = crono.display;
    if (crono.diff >= overflow) {
        showtime.display = "overflow";
    }
    showtime.partials = crono.partials;
    if (debug) {
        console.log("in fuction status2: showtime.display:", showtime.display);
        console.log("in fuction status2: showtime.partials:", showtime.partials);
    }
    return showtime;
}

function aceptaTecla(tecla, crono) {
    if (debug) {
        console.log("in fuction aceptaTecla: Status", status, "con la tecla", tecla);
    }
    switch (status) {
        case 1:
            return status1(tecla, crono);
        case 2:
            return status2(tecla, crono);
        default:
            throw new RangeError("Status not found:", status);
    }
}

function main() {
    let crono = {};
    crono.display = "00:00:00:00";
    crono.partials = [];
    crono.start = null;
    status = 1;
    let show = {};

    show = aceptaTecla("s", crono);
    console.log("main: show.display:", show.display);
    console.log("main: show.partials", show.partials);
    console.log("\n");
    sleep(3.6);

    show = aceptaTecla("p", crono);
    console.log("main: show.display:", show.display);
    console.log("main: show.partials", show.partials);
    console.log("\n");

    sleep(5);

    show = aceptaTecla("p", crono);
    console.log("main: show.display:", show.display);
    console.log("main: show.partials", show.partials);
    console.log("\n");

    show = aceptaTecla("s", crono);
    console.log("main: show.display:", show.display);
    console.log("main: show.partials", show.partials);
    console.log("\n");

    show = aceptaTecla("r", crono);
    console.log("main: show.display:", show.display);
    console.log("main: show.partials", show.partials);
    console.log("\n");

    show = aceptaTecla("s", crono);
    console.log("main: show.display:", show.display);
    console.log("main: show.partials", show.partials);
    console.log("\n");
    
    sleep(2.8);

    show = aceptaTecla("s", crono);
    console.log("main: show.display:", show.display);
    console.log("main: show.partials", show.partials);

}

main();
