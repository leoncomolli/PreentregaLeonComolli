const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevaZapa = document.createElement("div");
        nuevaZapa.classList = "tarjeta-producto";
        nuevaZapa.innerHTML = `
        <img src="./img/productos/${producto.id}.jpg">
        <h3>/${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button>Agregar al carrito</button>
        `
        contenedorTarjetas.appendChild(nuevaZapa);
        nuevaZapa.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(producto))
    });
}

crearTarjetasProductosInicio(zapas); 