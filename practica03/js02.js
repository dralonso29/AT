'use strict'

let p={ "m/s":1, "km/h":3.6, "mph":2.23694}
let units, unit;
units = Object.keys(p);

function converter(v, u) {
    if (v !== undefined && typeof v === 'number' && u !== undefined) {
        for(unit of units) {
            if (u === unit) {
                return v * p[unit];
            }
        }
        console.log("Error: can't convert to unit ", u);
        return;
    }else if (v === undefined) {
        console.log("Error: invalid params velocity: ", v);
        return;
    }else if (u === undefined) {
        console.log("Error: invalid params unit: ", u);
        return;
    }else if (v !== 'number') {
        console.log("Error: invalid params unit (not a number): ", v);
        return;
    }

    return;
}
// convertion to m/s
console.log(converter(1, "m/s"));
console.log(converter(50, "m/s"));

// convertion to km/h
console.log(converter(1, "km/h"));
console.log(converter(50, "km/h"));

// convertion to mph
console.log(converter(1, "mph"));
console.log(converter(50, "mph"));

// bad convertion: velocity is not a number
console.log(converter("patata", "mph"));

//bad convertion: invalid number of params
console.log(converter(1));

//bad convertion: not found unit "patata"
console.log(converter(1, "patata"));
