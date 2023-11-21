function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("zapatillas"));
    console.log(memoria);
    let cuenta = 0;
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("zapatillas",JSON.stringify([nuevoProducto]));
        cuenta = 1;
        } else {
            const indiceProducto = memoria.findIndex(zapatillas => zapatillas.id === producto.id);
            console.log(indiceProducto)
            const nuevaMemoria = memoria;
            if(indiceProducto === -1){   
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
            } else {
                nuevaMemoria[indiceProducto].cantidad ++;
                cuenta = nuevaMemoria[indiceProducto].cantidad;
            }
            localStorage.setItem("zapatillas",JSON.stringify(nuevaMemoria));
            return cuenta;
        }
        actualizarNumeroCarrito();
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("zapatillas"));
    const indiceProducto = memoria.findIndex(zapatillas => zapatillas.id === producto.id);
    if(memoria[indiceProducto].cantidad ===1){
        memoria.splice(indiceProducto,1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("zapatillas",JSON.stringify(memoria));
}

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const ceuntaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("zapatillas"));
    const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0 );
    ceuntaCarritoElement.innerText = cuenta;
}

actualizarNumeroCarrito();