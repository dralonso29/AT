'use strict'

import * as vjcanvas from "./vjcanvas.js"
// Para probar el fichero html asociado al canvas, lanzamos: python3 -m http.server 7777 y nos vamos a 0.0.0.0:7777 en
// el navegador (en firefox me iba ordenes de magnitud mas rapido que en chrome)

function put_base_circles(diam, x0, x1, y0, y1, color_base) {
    let pos = 0;
    for (let x = x0; x <= x1; x +=diam) {
        for (let y = y0; y <= y1; y +=diam) {
            pos = Math.round(Math.random()*(color_base.length-1));
            vjcanvas.circle(x, y, diam * 1.5, color_base[pos]);
        }
    }
}

function getRandom(max, min){
    return Math.round((Math.random()*(max-min)+min));
}

function put_random(x0, x1, y0, y1, color, prob){
    for (let x = x0; x <= x1; x +=100) {
        for (let y = y0; y <= y1; y +=100) {
            let lados = getRandom(10, 3);
            let radio = Math.round(Math.random()*50);
            if ((Math.random() >= prob)) {
                vjcanvas.polygon(x, y, lados, radio, color);
            }
        }
    }
}

function put_base_square(x0, x1, y0, y1, color){
    let pos = 0;
    for (let x = x0; x <= x1; x +=30) {
        for (let y = y0; y <= y1; y +=30) {
            let lados = 4;
            let radio = 20;
            pos = Math.round(Math.random()*(color.length-1));
            vjcanvas.polygon(x, y, lados, radio, color[pos]);
        }
    }
}

function put_camouflage_jungle(x0, x1, y0, y1, colors) {
    let diam = 25;
    let most_freq_colors = [colors[0], colors[1]]
    put_base_circles(diam, x0, x1, y0, y1, most_freq_colors);
    let ancho, alto, color, color_borde, ancho_borde, prob;
    ancho = 80;
    alto = 40;
    color = colors[2];
    color_borde = "black";
    ancho_borde = 1;
    prob = 0.6; // probabilidad de aparicion
    put_random(x0, x1, y0, y1, color, prob);
    ancho = 30;
    alto = 30;
    color = colors[3];
    color_borde = "black";
    ancho_borde = 1;
    prob = 0.5; // probabilidad de aparicion
    put_random(x0, x1, y0, y1, color, prob);
};

function put_camouflage_marine(x0, x1, y0, y1, colors) {
    let diam = 25;
    let most_freq_colors = [colors[0], colors[1]]
    put_base_circles(diam, x0, x1, y0, y1, most_freq_colors);
    let ancho, alto, color, color_borde, ancho_borde, prob;
    ancho = 30;
    alto = 30;
    color = colors[3];
    color_borde = "black";
    ancho_borde = 1;
    prob = 0.5; // probabilidad de aparicion
    put_random(x0, x1, y0, y1, color, prob);
};

function put_camouflage_urban(x0, x1, y0, y1, colors) {
    put_base_square(x0, x1, y0, y1, colors);
    let prob = 0.7; // probabilidad de aparicion
    let color = colors[1];
    put_random(x0, x1, y0, y1, color, prob);
};

function put_triangles_rotating(x, y, colors) {
    let radio = getRandom(10, 51);
    let lados = 3;
    let color_borde = 'black';
    let ancho_borde = 1;
    let from_center = true;
    let rotacion = getRandom(0, 360);
    let pos = Math.round(Math.random()*(colors.length-1));
    let color = colors[pos];

    vjcanvas.polygon(x, y, lados, radio , color, from_center,
        color_borde, ancho_borde, rotacion);
}

function put_camouflage_desert(x0, x1, y0, y1, colors) {
    for (let x = x0; x <= x1; x +=10) {
        for (let y = y0; y <= y1; y +=10) {
            put_triangles_rotating(x, y, colors);
        }
    }
};

function put_franja(franja, x0, x1, y0, y1) {
    let jungle = ['#339933', '#b33c00', '#331100', '#F0BD59'];
    let marine = ['#576EB3', '#263359', '#9EACD0', '#D7DBE6'];
    let urban = ['#FFFFFF', '#B2B2B2', '#848484', '#000000'];
    let desert = ['#C93200', '#792A0F', '#E3CB6F', '#C0B27D'];
    switch (franja) {
        case 0:
            put_camouflage_jungle(x0, x1, y0, y1, jungle);
            break;
        case 1:
            put_camouflage_marine(x0, x1, y0, y1, marine);
            break;
        case 2:
            put_camouflage_urban(x0, x1, y0, y1, urban);
            break;
        default:
            put_camouflage_desert(x0, x1, y0, y1, desert);
            break;
    }
}

function main(){

    // Fijamos las coordenadas (logicas)
    let min_x = 0;
    let max_x = 1000
    let min_y = 0;
    let max_y = 4000;

    vjcanvas.set_coords(min_x, max_x, min_y);

    let i = 0;
    let x0 = 0;
    let x1 = max_x;
    let y0 = 0;
    let y1 = 1000;
    let size_franja = 1000;
    let nfranjas = max_y/1000;
    while (i < nfranjas) {
        //console.log("Pasada",i," -> x0 =", x0, ", x1 =", x1, ", y0 =", y0, ", y1 =", y1);
        put_franja(i, x0, x1, y0, y1);
        y0 = y1;
        y1+=size_franja;
        i++;
    }
};

main();
