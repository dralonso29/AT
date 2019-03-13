'use strict'

function sleep(x) {
    let first = new Date();
    let actual;
    let diff;
    while (true) {
        actual = new Date();
        diff = actual - first;
        if (diff >= (x*1000)) {
            return;
        }
    }
}

let sec = 3;
sleep(sec);
