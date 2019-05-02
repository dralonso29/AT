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
    let str = "";
    let tot = 0;

    if (have_exceptions(oklen) || have_exceptions(minlower) || have_exceptions(minupper) ||
        have_exceptions(minsp) ||have_exceptions(minnbs)) {
        console.log("Dentro del if de excepciones");
        return;
    }

    for (w of passwd) {
        if(findItem(w, minus)){
            n++;
        }
        len++;
    };
    tot += n;
    if (n === 0) {
        invalidchar = false;
    }
    if (len < oklen) {
        //console.log("Longitud requerida: ", oklen, ". Longitud actual: ", len);
        str = str + ("Longitud requerida: "+ oklen+ ". Longitud actual: "+ len+"\n");
        sol = false;
    }
    if (n < minlower) {
        // console.log("Minusculas requeridas: ", minlower, ". Minusculas actuales: ", n);
        str = str +("Minusculas requeridas: "+ minlower+ ". Minusculas actuales: "+ n+"\n");
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

    if (n < minupper) {
        // console.log("Mayusculas requeridas: ", minupper, ". Mayusculas actuales: ", n);
        str = str +("Mayusculas requeridas: "+ minupper+ ". Mayusculas actuales: "+ n+"\n");
        sol = false;
    }
    if (debug) {
        console.log("Numero mayusculas: ",n);
    }
    tot += n;
    n = 0;
    for (w of passwd) {
        if(findItem(w, special)){
            n++;
        }
    };
    if (n < minsp) {
        // console.log("Especiales requeridas: ", minsp, ". Especiales actuales: ", n);
        str = str +("Especiales requeridas: "+ minsp+ ". Especiales actuales: "+ n+"\n");
        sol = false;
    }
    if (debug) {
        console.log("Numero especiales: ",n);
    }
    tot += n;
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
        //console.log("Numeros requeridos: ", minnbs, ". Numeros actuales: ", n);
        str = str +("Numeros requeridos: "+ minnbs+ ". Numeros actuales: "+ n+"\n");
        sol = false;
    }
    if (debug) {
        console.log("Numero numeros: ",n);
    }
    tot += n;
    console.log("total: ",tot);
    console.log("len: ",len);
    // MIRAR SI LOS TAMAÑOS NO SON IGUALES. EN ESE CASO HAY ALGUN CARACTER INVALIDO
    if (tot < len) {
        str = str +("Error: password must not have invalid special characters"+"\n");
    }
    if (sol) {
        //console.log("ok");
        str = "ok";
    }
    return str;
}

function main() {
    // let passwd = "so";
    // console.log("Contraseña: ", passwd);
    // console.log(passwValidator(passwd, 3, 3, 3, 3, 3));
    //
    // passwd = "hola";
    // console.log("Contraseña: ", passwd);
    // console.log(passwValidator(passwd, 3, 3, 3, 3, 3));
    //
    // passwd = "hola123"
    // console.log("Contraseña: ", passwd);
    // console.log(passwValidator(passwd, 3, 3, 3, 3, 3));
    //
    // passwd = "AAhola123$&%"
    // console.log("Contraseña: ", passwd);
    // console.log(passwValidator(passwd, 3, 3, 3, 3, 3));

    let passwd = "hola123PPE@["
    console.log("Contraseña: ", passwd);
    passwValidator(passwd, 3, 3, 3, 3, 3);

    // passwd = "hola123PPE$%["
    // console.log("Contraseña: ", passwd);
    // console.log(passwValidator(passwd, 3, 3, 3, 3, 3));
    //
    passwd = "hola"
    console.log("Contraseña: ", passwd);
    console.log(passwValidator(passwd, "x", 3, -1, 3, 3));
    //
    // passwd = "hola"
    // console.log("Contraseña: ", passwd);
    // console.log(passwValidator(passwd, 2, 3, -1, 3, 3));
}

main();
