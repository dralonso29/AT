// vJcanvas  v0.1
// (c)  GSyC  ETSIT  www.urjc.es   2019
// Released under MIT license

let vc={   //  virtual coordinates, global object
    max_x: undefined,
    max_y: undefined,
    min_x: undefined,
    min_y: undefined,
};

export function set_coords(
    min_x, max_x, min_y, max_y, correct_ratio=true){
    vc.min_x  = min_x;
    vc.max_x  = max_x;
    vc.min_y  = min_y;

    let xg_max = $("canvas").width();
    let yg_max = $("canvas").height();

    if (correct_ratio){
        vc.max_y = (yg_max * (max_x - min_x)) / xg_max  + min_y;
    } else {
        vc.max_y = max_y;
    };

    return;
}

export function convert_x(x){

    let r = $("canvas").width() * (x - vc.min_x)  / ( vc.max_x - vc.min_x) ;
    return r;
};


export function width_transform(x){
    let r = convert_x(x) - convert_x(0);
    return r;
};

export function convert_y(y){
    let max_yg = $("canvas").height();
    let r =  ( (vc.max_y - y ) * max_yg  ) / (vc.max_y - vc.min_y);
    return r;
};


export function height_transform(y){
    let r = convert_y(y) - convert_y(0);
    //r = y;
    return r;
}


export function rectangle(x, y, width, height, color, border_color, border_width) {
    let xg, yg;  // x graphical, y graphical
    let g_width, g_height;  // graphical width and height
    xg = convert_x(x);
    yg = convert_y(y);

    g_width = width_transform(width);
    g_height = height_transform(height);

    $('canvas').drawRect({
        fillStyle: color,
        x: xg,
        y: yg,
        width: g_width,
        height: g_height,
        strokeStyle: border_color,
        strokeWidth: border_width,
        fromCenter: false
    });
};


export function punto(x, y, color, thickness) {
    let xg, yg;  // graphical x and y
    xg = convert_x(x);
    yg = convert_y(y);
    $('canvas').drawRect({
        fillStyle: color,
        x: xg,
        y: yg,
        width: thickness,
        height: thickness
    });
};

export function circle(x, y, diameter, color, border_color, border_width){
    let x_g, y_g, size_xg, size_yg;  // graphical x, y and size
    x_g = convert_x(x);
    y_g = convert_y(y);
    size_xg = width_transform(diameter)
    size_yg = height_transform(diameter)
    $('canvas').drawEllipse({
        fillStyle: color,
        strokeStyle: border_color,
        strokeWidth: border_width,
        x: x_g,
        y: y_g,
        fromCenter: true,
        width: size_xg,
        height:  size_yg ,
      });
}

export function line( dots, color, width){
    console.log("dots vale ",dots);

    // The .drawLine() object
    var obj = {
      strokeStyle: color,
      strokeWidth: width,
      rounded: true
    };

    // Add the points from the array to the object
    for (var p = 0; p < dots.length; p += 1) {
      obj['x'+(p+1)] = convert_x(dots[p][0]);
      obj['y'+(p+1)] = convert_y(dots[p][1]);
      //obj['x'+(p+1)] = dots[p][0];
      //obj['y'+(p+1)] = dots[p][1];
    }

    // Draw the line
    $('canvas').drawLine(obj);
}


export function polygon(x,y, sides,  radius, color, from_center = false,
        border_color='black', border_width=1, rotate = 0){

    let x_g = convert_x(x);
    let y_g = convert_y(y);

    $('canvas').drawPolygon({
        fillStyle: color,
        strokeStyle: border_color,
        strokeWidth: border_width,
        x: x_g,
        y: y_g,
        radius: radius,
        sides: sides,
        rotate: rotate,
        fromCenter: from_center,
      });
}


export function hsl_to_color(h, s, l){
    if (l > 100) {
        l = 100;
    } else if (l < 0 ) {
        l = 0;
    }

    if (s > 100) {
        l = 100;
    } else if (s < 0){
        s = 0;
    }

    let rval =  "hsl(" + String(h) + ", " +  String(s) + "%, "
        + String(l) + "%)"
    return rval
}


export function random_color(){
    let r =  Math.round(Math.random() * 256);
    let g =  Math.round(Math.random() * 256);
    let b =  Math.round(Math.random() * 256);
    let rval = "rgb(" + r + ", " + g + ", " + b + " )"
    return rval
}


export function random_range(max_inicio, incremento_base, elementos){

    let x0 =  Math.random() * max_inicio;
}


export function dot(x, y, color, ancho) {

    let x_g = convert_x(x);
    let y_g = convert_y(y);

    $('canvas').drawRect({
        fillStyle: color,
        x: x_g,
        y: y_g,
        width: ancho,
        height: ancho
    });
}
