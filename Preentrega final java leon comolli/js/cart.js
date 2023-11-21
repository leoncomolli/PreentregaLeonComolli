const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");

function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("zapatillas"));
    console.log(productos)
    productos.forEach(producto => {
        const nuevaZapa = document.createElement("div");
        nuevaZapa.classList = "tarjeta-producto";
        nuevaZapa.innerHTML = `
        <img src="./img/productos/${producto.id}.jpg">
        <h3>/${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
        </div>
        `
        contenedorTarjetas.appendChild(nuevaZapa);
        nuevaZapa
        .getElementsByTagName("button")[1]
        .addEventListener("click",(e)=> {
            agregarAlCarrito(producto)
            const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
            cuentaElement.innerText = agregarAlCarrito(producto);
            actualizarTotales();
        });
        nuevaZapa
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
            restarAlCarrito(producto);
            crearTarjetasProductosInicio();
            actualizarTotales();
        });
    });

}

crearTarjetasProductosInicio(); 
actualizarTotales();
function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("zapatillas"));
    let unidades = 0;
    let precio = 0;
        productos.forEach(producto =>{
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio
    }
