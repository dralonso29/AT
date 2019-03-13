'use strict'
function frommstokmh(v) {
    return v * 3.6;
}

let v1, v2;
v1 = 1; // m/s
v2 = 50; // m/s
console.log(frommstokmh(v1));
console.log(frommstokmh(v2));

function frommstomph(v) {
    return v * 2.23694;
}

v1 = 1; // m/s
v2 = 50; // m/s
console.log(frommstomph(v1));
console.log(frommstomph(v2));
