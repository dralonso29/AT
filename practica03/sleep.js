'use strict'

function sleep(x) {
    let first = new Date();
    let actual;
    let diff;
    console.log(first);
    while (true) {
        actual = new Date();
        diff = actual - first;
        console.log(diff);
        if (diff === (x*1000)) {
            return;
        }
    }
}

let sec = 3;
sleep(sec);
