'use strict'

import * as vjcanvas from "./vjcanvas.js"

function main(){

    // Fijamos las coordenadas (lÃ³gicas)
    let min_x = -200;
    let max_x = 1000
    let min_y = -100;
    // max_y no lo especificamos, la librerÃ­a lo calcula automÃ¡ticamente
    // para manterner las proporciones grÃ¡ficas
    vjcanvas.set_coords(min_x, max_x, min_y); 

    // Determinamos la posiciÃ³n y el tamaÃ±o de cada elemento 
    // (cÃ­rculos y rectÃ¡ngulos)
    let x, y, ancho, alto, diametro, color, color_borde, ancho_borde;
    x = 0;
    y = 0;
    ancho = 200;
    alto = 200;
    color = "blue";
    color_borde = "black";
    ancho_borde = 1;
    vjcanvas.rectangle(x, y, ancho, alto, color, color_borde, ancho_borde)

    x = 0;
    y = 200;
    ancho = 200;
    alto = 200;
    color = "green";
    vjcanvas.rectangle(x, y, ancho, alto, color, color_borde, ancho_borde)

    x = 200;
    y = 0;
    ancho = 200;
    alto = 400;
    color = "grey";
    vjcanvas.rectangle(x, y, ancho, alto, color, color_borde, ancho_borde)

    x = 300;
    y = 200;
    diametro = 200;
    color = "magenta";
    vjcanvas.circle(x, y, diametro, color, color_borde, ancho_borde);

    x = 100;
    y = 100;
    diametro = 200;
    color = "yellow";
    vjcanvas.circle(x, y, diametro, color, color_borde, ancho_borde);

    x = 100;
    y = 300;
    diametro = 200;
    color = "brown";
    vjcanvas.circle(x, y, diametro, color, color_borde, ancho_borde);
};


main();
