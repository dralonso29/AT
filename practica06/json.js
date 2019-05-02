'use strict'

let objeto = {
    numero:5,
    string:"pepe",
    array:[1,"jose",3],
    booleano:true,
    nada:null,
    otroobjeto:{arraynum:[1,2,3], name:"luis"},
};


function main(){
    let cadena = JSON.stringify(objeto);
    console.log(typeof(cadena),"-->",cadena);

    let recovered_object = JSON.parse(cadena);
    console.log(typeof(recovered_object),"-->",recovered_object);
}

main();
