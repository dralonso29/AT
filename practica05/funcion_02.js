'use strict'

import * as vjcanvas from "./vjcanvas2.js"

let vc = {};  // virtual coordinates
vc.min_x = -4;
vc.max_x = 4;
vc.min_y = -2;
vc.max_y = 2;


function dibuja_ejes(){
    let color = "black";
    let grosor = 1;
    let puntos;
    puntos = [ [vc.min_x,0], [vc.max_x, 0] ];
    vjcanvas.line(puntos, color, grosor);
    vjcanvas.setText(0.1, 1.9, "y", "black"); // y axis

    puntos = [ [0,vc.min_y], [0, vc.max_y] ] ;
    vjcanvas.line(puntos, color, grosor);
    vjcanvas.setText(3.8, -0.05, "x", "black"); // x axis
    return;
}


function main(){
    let corrige_ratio = false;
    vjcanvas.set_coords(vc.min_x,vc. max_x, vc.min_y, vc.max_y, corrige_ratio);

    let color = "black"
    let grosor = 1;
    let y;
    let incremento_x = 0.02;

    dibuja_ejes();

    for(let x = vc.min_x; x<= vc.max_x; x += incremento_x){
        y = Math.sign(x);
        vjcanvas.dot(x ,y ,color ,grosor);
    }
    vjcanvas.setText(2, 1.3, "--- y = sign(x)", "black"); // sign(x)

};


main();
