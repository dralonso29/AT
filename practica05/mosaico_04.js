'use strict'

import * as vjcanvas from "./vjcanvas.js"

function main(){
    let x, y, ancho, alto, diametro, color;

    let min_x = 0;
    let max_x = 1000
    let min_y = 0;
    let max_y = 600;
    vjcanvas.set_coords(min_x, max_x, min_y);

    diametro = 25;
    let colores;
    colores = ['green', 'blue', 'pink','yellow','orange'];
    // Repetimos el negro, para que predomine
    //colores = colores.concat(['black', 'black', 'black', 'black', 'black'])
    console.log(colores);
    let i_color = 0; // indice color
    for (let x=-50; x <= max_x; x += diametro)
        for (let y=max_y; y >= -100; y -= diametro*1) {
            i_color = Math.round(Math.random() * (colores.length - 1))
            vjcanvas.circle(x, y, diametro * 1.5, colores[i_color]);
    }
}

main();
