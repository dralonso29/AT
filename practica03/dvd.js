'use strict'
let estado ;  // Variable global
                 // Lo aceptamos por ser Ãºnica, muy importante, verdaderamente global


function procesa_tecla(tecla){
    console.log("tecla",tecla);
    switch(estado){
        case(1):
            estado_1(tecla);
            break;
        case(2):
            estado_2(tecla);
            break;
        case(3):
            estado_3(tecla);
            break;
        case(4):
            estado_4(tecla);
            break;
        default:
            throw new RangeError("Estado desconocido:", estado);
    }
}


function estado_1(tecla){
    console.log("Estado 1. Caddy dentro, parado.");
    switch(tecla){
        case("oc"):
            console.log("Abrir caddy.");
            estado = 2;
            break;
        case("pp"):
            console.log("Reproducir disco.");
            estado = 3;
            break;
        default:
            console.log("Ignorando tecla " + tecla);
    }
}


function estado_2(tecla){
    console.log("Estado 2. Caddy fuera.");
    switch(tecla){
        case("oc"):
            console.log("Meter caddy.");
            estado = 1;
            break;
        case("pp"):
            console.log("Meter caddy.");
            console.log("Reproducir.");
            estado = 3;
            break;
        default:
            console.log("Ignorando tecla " + tecla);
    }
}


function estado_3(tecla){
    console.log("Estado 3. Reproduciendo.");
    switch(tecla){
        case("s"):
            console.log("Detener reproducciÃ³n.");
            estado = 1;
            break;
        case("pp"):
            console.log("Pausar reproducciÃ³n.");
            estado = 4;
            break;
        default:
            console.log("Ignorando tecla " + tecla);
    }
}


function estado_4(tecla){
    console.log("Estado 4. ReproducciÃ³n pausada.");
    switch(tecla){
        case("s"):
            console.log("Detener reproducciÃ³n.");
            estado = 1;
            break;
        case("pp"):
            console.log("Continuar reproducciÃ³n.");
            estado = 3;
            break;
        default:
            console.log("Ignorando tecla " + tecla);
    }
}


function prueba_1(){
    estado = 1;
    console.log("Voy a abrir, pulsar tecla inutil y cerrar.");
    procesa_tecla("oc");
    procesa_tecla("s");
    procesa_tecla("oc");

    console.log("\nVoy a reproducir y parar.");
    procesa_tecla("pp");
    procesa_tecla("s");

    console.log("\nVoy a reproducir y pausar.");
    procesa_tecla("pp");
    procesa_tecla("pp");

    console.log("\nVoy a seguir reproduciendo, pausar y parar.");
    procesa_tecla("pp");
    procesa_tecla("pp");
    procesa_tecla("s");

    console.log("\nVoy a pulsar tecla inÃºtil");
    procesa_tecla("s");
}


function main(){
    prueba_1();
}


main();
