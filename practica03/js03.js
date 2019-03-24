'use strict'

let minus = "abcdefghijklmnñopqrstuvwxyzáéíóúçü";
let mayus = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÇÜ";
let special = ",.-{}[]!\"·$%&/()=?¿¡'";
let numbers = "0123456789";
let debug = false;

//passwd: contraseña
//oklen: longitud contraseña para que sea valida
//minlower: minimo de minusculas requeridas
//minupper: minimo de mayusculas requeridas
//minnbs: minimo de numeros requeridos
//minsp: minimo de caracteres especiales requeridos

function findItem(wrd, str){
    let l;
    for (l of str) {
        if (l === wrd) {
            if (debug) {
                console.log("Encontrada: ", l, "= ", wrd);
            }
            return true;
        }
    }
    return false;
}

function have_exceptions(variable) {
    if (debug) {
        console.log("variable: "+ variable);
    }
    try {
        if (typeof variable !== 'number') {
            throw variable +' is not a number';
        }
    } catch (e) {
        console.log('capturada excepcion: '+e);
        return true;
    }

    try {
        if (variable < 0) {
            throw variable +' must be greater than zero';
        }
    } catch (e) {
        console.log('capturada excepcion: '+e);
        return true;
    }
    return false;
}

function passwValidator(passwd, oklen, minlower, minupper, minnbs, minsp) {
    let w;
    let may;
    let l;
    let n = 0;
    let len = 0;
    let sol = true;
    let invalidchar = true;

    if (have_exceptions(oklen) || have_exceptions(minlower) || have_exceptions(minupper) ||
        have_exceptions(minsp) ||have_exceptions(minnbs)) {
        return;
    }

    for (w of passwd) {
        if(findItem(w, minus)){
            n++;
        }
        len++;
    };
    if (n === 0) {
        invalidchar = false;
    }
    if (len < oklen) {
        console.log("Longitud requerida: ", oklen, ". Longitud actual: ", len);
        sol = false;
    }
    if (n < minlower) {
        console.log("Minusculas requeridas: ", minlower, ". Minusculas actuales: ", n);
        sol = false;
    }
    if (debug) {
        console.log("Numero minusculas: ",n);
    }
    n = 0;
    for (w of passwd) {
        if(findItem(w, mayus)){
            n++;
        }
    };
    if (n === 0) {
        invalidchar = false;
    }
    if (n < minupper) {
        console.log("Mayusculas requeridas: ", minupper, ". Mayusculas actuales: ", n);
        sol = false;
    }
    if (debug) {
        console.log("Numero mayusculas: ",n);
    }
    n = 0;
    for (w of passwd) {
        if(findItem(w, special)){
            n++;
        }
    };
    if (n < minsp) {
        if (invalidchar) {
            console.log("Error: password must not have invalid special characters");
        }
        console.log("Especiales requeridas: ", minsp, ". Especiales actuales: ", n);
        sol = false;
    }
    if (debug) {
        console.log("Numero especiales: ",n);
    }
    n = 0;
    for (w of passwd) {
        if(findItem(w, numbers)){
            n++;
        }
        if (n === 0) {
            invalidchar = false;
        }
    };
    if (n < minnbs) {
        console.log("Numeros requeridos: ", minnbs, ". Numeros actuales: ", n);
        sol = false;
    }
    if (debug) {
        console.log("Numero numeros: ",n);
    }
    if (sol) {
        console.log("ok");
    }
    console.log("\n");
}

function main() {
    let passwd = "so";
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 3, 3, 3, 3, 3);

    passwd = "hola";
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 3, 3, 3, 3, 3);

    passwd = "hola123"
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 3, 3, 3, 3, 3);

    passwd = "AAhola123$&%"
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 3, 3, 3, 3, 3);

    passwd = "hola123PPE@["
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 3, 3, 3, 3, 3);

    passwd = "hola123PPE$%["
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 3, 3, 3, 3, 3);

    passwd = "hola"
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, "x", 3, -1, 3, 3);

    passwd = "hola"
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 2, 3, -1, 3, 3);
}

main();
