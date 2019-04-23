'use strict'

import * as vjcanvas from "./vjcanvas.js"

function isEven(n){
    if ((n%2) === 0) {
        return true;
    }
    return false;
}

function put_square_random(x, y, colors, posx, posy) {
    let lados = 4;
    let radio = 60;
    let color_borde = 'black';
    let ancho_borde = 1;
    let from_center = true;

    let rotacion = 0;
    let incremento_rotacion = 5;
    let hue = 122;
    let saturation = 100;
    let lightness = 50;
    let incremento_lightness = -1.0;
    let incremento_radio = .9;

    for (let rotacion=0; rotacion <= 270; rotacion += incremento_rotacion){

        if (isEven(posx) || !isEven(posy)) {
            let pos = Math.round(Math.random()*(colors.length-1));
            vjcanvas.polygon(x, y, lados, radio , colors[pos], from_center,
                color_borde, ancho_borde, 0);
        }else{
            let color = vjcanvas.hsl_to_color(hue, saturation, lightness)
            vjcanvas.polygon(x, y, lados, radio , color, from_center,
            color_borde, ancho_borde, rotacion);
        }

        lightness += incremento_lightness;
        rotacion += incremento_rotacion;
        radio *= incremento_radio;
    }
}

function main() {
    let min_x = 0;
    let max_x = 1000
    let min_y = 0;
    let max_y = 1000;
    vjcanvas.set_coords(min_x, max_x, min_y);

    let colors = ['#66ff99', '#00ff55', '#00b33c', '#003311'];
    let distance = 90;
    let posx = 0;
    let posy = 0;
    
    for (let x = 0; x < max_x; x+=distance) {
        posy++;
        for (let y = 0; y < max_y; y+=distance) {
            put_square_random(x, y, colors, posx, posy);
            posx++;

        }
    }

}

main();
