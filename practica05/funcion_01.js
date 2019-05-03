'use strict'

import * as vjcanvas from "./vjcanvas2.js"

let vc = {};  // virtual coordinates
vc.min_x = -15;
vc.max_x = 15;
vc.min_y = -2;
vc.max_y = 2;


function dibuja_ejes(){
    let color = "black";
    let grosor = 1;
    let puntos;
    puntos = [ [vc.min_x,0], [vc.max_x, 0] ];
    vjcanvas.line(puntos, color, grosor);
    vjcanvas.setText(0.2, 1.9, "y", "black"); // y axis

    puntos = [ [0,vc.min_y], [0, vc.max_y] ] ;
    vjcanvas.line(puntos, color, grosor);
    vjcanvas.setText(14.7, -0.05, "x", "black"); // x axis
    return;
}


function main(){
    let corrige_ratio = false;
    vjcanvas.set_coords(vc.min_x,vc. max_x, vc.min_y, vc.max_y, corrige_ratio);

    let color = "black"
    let grosor = 1;
    let y;
    let incremento_x = 0.01;

    dibuja_ejes();

    let amplitud = 5;
    for(let x = vc.min_x; x<= vc.max_x; x += incremento_x){
        y = amplitud * Math.sin(x)/(Math.PI * x) ;
        vjcanvas.dot(x ,y ,color ,grosor);
    }
    // vjcanvas.setText(5.6, 1.05, "...", "black");
    vjcanvas.setText(7, 1, "--- y = 5*sinc(x)", "black"); // 5*sinc(x)

    amplitud = 3;
    color = "green"
    for(let x = vc.min_x; x<= vc.max_x; x += incremento_x){
        y = amplitud * Math.sin(x)/(Math.PI * x) ;
        vjcanvas.dot(x ,y ,color ,grosor);
    }
    vjcanvas.setText(7, 0.8, "--- y = 3*sinc(x)", "green"); // 3*sinc(x)

    amplitud = 2;
    color = "red"
    for(let x = vc.min_x; x<= vc.max_x; x += incremento_x){
        y = amplitud * Math.sin(x)/(Math.PI * x) ;
        vjcanvas.dot(x ,y ,color ,grosor);
    }
    vjcanvas.setText(7, 0.6, "--- y = 2*sinc(x)", "red"); // 2*sinc(x)
};


main();
