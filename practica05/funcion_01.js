'use strict'

import * as vjcanvas from "./vjcanvas.js"

let vc = {};  // virtual coordinates
vc.min_x = Math.PI * -4;
vc.max_x = Math.PI * 4;
vc.min_y = -2;
vc.max_y = 2;


function dibuja_ejes(){
    let color = "black";
    let grosor = 1;
    let puntos;
    puntos = [ [vc.min_x,0], [vc.max_x, 0] ];
    vjcanvas.line(puntos, color, grosor);

    puntos = [ [0,vc.min_y], [0, vc.max_y] ] ;
    vjcanvas.line(puntos, color, grosor);
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

    let amplitud = 5;
    for(let x = vc.min_x; x<= vc.max_x; x += incremento_x){
        y = amplitud * Math.sin(x)/(Math.PI * x) ;
        vjcanvas.dot(x ,y ,color ,grosor);
    }

    amplitud = 3;
    color = "green"
    for(let x = vc.min_x; x<= vc.max_x; x += incremento_x){
        y = amplitud * Math.sin(x)/(Math.PI * x) ;
        vjcanvas.dot(x ,y ,color ,grosor);
    }

    amplitud = 2;
    color = "red"
    for(let x = vc.min_x; x<= vc.max_x; x += incremento_x){
        y = amplitud * Math.sin(x)/(Math.PI * x) ;
        vjcanvas.dot(x ,y ,color ,grosor);
    }
};


main();
