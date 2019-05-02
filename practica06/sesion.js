'use strict'

function deleteAll(){
    console.log("Borramos todo...");
    localStorage.clear();
}

function isUserKnown(name){
    return localStorage.getItem(name);
}

function getMsg(info) {
    let oldInfoStr = localStorage.getItem(info.username);
    let oldInfoObj = JSON.parse(oldInfoStr);
    let msg = "Hola "+info.username+" .Ultima visita: "+oldInfoObj.date;

    if (info.lat === oldInfoObj.lat && info.long === oldInfoObj.long) {
        info.date = oldInfoObj.date; //update last visit
        msg += " desde la misma ubicacion (lat: "+info.lat+" ,long: "+info.long+" ,precison: "+info.accuracy+" metros";
        return msg;
    }
    msg += " .Nueva ubicacion lat: "+info.lat+" ,long: "+info.long+" ,precison: "+info.accuracy+" metros";
    return msg;
}

function showMessage(info) {
    let name = prompt("¿Cual es tu nombre?");
    info.username = name;
    info.date = new Date();
    if (isUserKnown(name)) {
        return getMsg(info);
    }
    let infoJSON = JSON.stringify(info);
    localStorage.setItem(info.username, infoJSON); //save object info as string in localStorage
    return "Primera visita de "+info.username+" Tu ubicacion: lat:"+info.lat+" ,long: "+info.long+" ,precision: "+info.accuracy+
            " metros, en el dia "+info.date;
}

function newInfo(){
    let info = {
        username: undefined,
        lat: undefined,
        long: undefined,
        accuracy: undefined,
        date: undefined,
    };
    return info;
}
