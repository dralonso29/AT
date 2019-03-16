'use strict'
//status = 1 --> parado
//status = 2 --> running
let status;
let btns = ["s", "p", "r"];
let million = Math.pow(10, 6);
let debug = false; //just switch between true or false for debugging the code

// function isButton(x) {
//     for (let btn of btns) {
//         if (x === btn) {
//             return true;
//         }
//     }
//     return false;
// }

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
    console.log("Dentro de timeConverter");
    let aux;
    if (!Number.isNaN(crono.diff)) {
        crono.hour = Math.floor(crono.diff/(3.6*million));
        crono.minutes = Math.floor((crono.diff%(3.6*million))/60000);
        crono.seconds = Math.floor(((crono.diff%(3.6*million))%60000)/1000);
        crono.milliseconds = Math.floor((crono.diff%1000)/100);
        formatTime(crono);
        crono.display = crono.hour + ":" + crono.minutes + ":" + crono.seconds +":" + crono.milliseconds;

        if (debug) {
            console.log(crono.diff);
            console.log("Horas", crono.hour);
            console.log("Minutos", crono.minutes);
            console.log("Segundos", crono.seconds);
            console.log("Milisegundos:", crono.milliseconds);
            console.log("Readable:", crono.display);
        }
    }
}

function btnStartStop(crono) {
    console.log("Dentro de StartStop");
    switch (status) {
        case 1:
            //starting crono
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
            btnStartStop(crono); //creamos una variable resultado o algo asi y la devolvemos
            if (debug) {
                console.log("status1: Has pulsado boton start/stop");
                console.log("status1: parado: start/stop: crono.start", crono.start);
                console.log("status1: parado: start/stop: crono.actual", crono.actual);
            }
            crono.diff = crono.actual - crono.start;
            timeConverter(crono);
            break;
        case btns[1]:
            console.log("Has pulsado boton partial");
            break;
        case btns[2]:
            console.log("Has pulsado boton reset");
            break;
        default:
            console.log("Error: boton", tecla, "no encontrado");
    }
    showtime.display = crono.display;
    showtime.partials = crono.partials;
    if (debug) {
        console.log("status1: showtime.display:", showtime.display);
        console.log("status1: showtime.partials:", showtime.partials);
    }
    return showtime;
}

function status2(tecla, crono) {
    let showtime = {};
    switch (tecla) {
        case btns[0]:
            btnStartStop(crono); //creamos una variable resultado o algo asi y la devolvemos
            if (debug) {
                console.log("status2: Has pulsado boton start/stop");
                console.log("status2: running: start/stop: crono.start:", crono.start);
                console.log("status2: running: start/stop: crono.actual:", crono.actual);
            }
            crono.diff = crono.actual - crono.start;
            timeConverter(crono);
            break;
        case btns[1]:
            console.log("Has pulsado boton partial");
            break;
        case btns[2]:
            console.log("Has pulsado boton reset");
            break;
        default:
            console.log("Error: boton", tecla, "no encontrado");
    }
    showtime.display = crono.display;
    showtime.partials = crono.partials;
    if (debug) {
        console.log("status2: showtime.display:", showtime.display);
        console.log("status2: showtime.partials:", showtime.partials);
    }
    return showtime;
}

function aceptaTecla(tecla, crono) {
    switch (status) {
        case 1:
            return status1(tecla, crono);
        case 2:
            return status2(tecla, crono);
        default:
            throw new RangeError("Status not found:", status);
    }
}

//acepta tecla no tiene que devolver el crono sino un objeto cuyos atributos sean display y partials
let crono = {};
crono.display = "00:00:00:00";
crono.partials = [];
crono.start = null;
status = 1;

let sec = 3.6;
let show = {};

//console.log(aceptaTecla("s", crono));
aceptaTecla("s", crono);
sleep(sec);
show = aceptaTecla("s", crono);
console.log("Main: show.display:", show.display);
console.log("Main: show.partials", show.partials);

show = aceptaTecla("p", crono);
console.log("Main: show.display:", show.display);
console.log("Main: show.partials", show.partials);
