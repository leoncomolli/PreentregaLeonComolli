// let cantCarritoVisual = document.querySelector("#cuenta-carrito");
// if(!isNaN(cantidadProductosCarrito)){
//     cantCarritoVisual.innerText=cantidadProductosCarrito;
// }

let zapas = [];
let carrito = [];
let cantidadProductoCarrito = document.querySelector("#cantidad-producto");
let spanTotalVisual = document.querySelector("#precio");
let precioTotal = 0;
let cantProductos = 0;
let cantCarrito = document.querySelector("#cuenta-carrito");

document.addEventListener("DOMContentLoaded", function () {
  const catalogoContainer = document.querySelector(".catalogo-container");
  if (catalogoContainer) {
    fetch("./js/zapatillas.json")
      .then((response) => response.json())
      .then((jsonCatalogo) => {
        const zapas = [];
        jsonCatalogo.forEach((productoJson) => {
          zapas.push(productoJson);
        });
        catalogoCompleto(zapas);
      });
  }
  const carritoContainer = document.querySelector(".carrito-container");
  if (carritoContainer) {
    catalogoCarrito();
  }
});

function catalogoCompleto(productos) {
  let contenedorTarjetas = document.querySelector(".catalogo-container");
  let cantProductosCarrito = parseInt(localStorage.getItem("cantCarrito"));
  if (cantProductosCarrito) {
    let cuentaCarritoSpan = document.querySelector("#cuenta-carrito");
    cuentaCarritoSpan.innerText = cantProductosCarrito;
  }
  if (contenedorTarjetas != null) {
    productos.forEach((producto) => {
      const nuevaZapa = document.createElement("div");
      nuevaZapa.classList = "tarjeta-producto";
      nuevaZapa.innerHTML = `
            <img src="./img/productos/${producto.img}">
            <h3>/${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
            `;
      contenedorTarjetas.appendChild(nuevaZapa);
      nuevaZapa
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => agregarAlCarrito(producto));
    });
  } else {
    console.log("estoy en el carrito");
  }
}

function catalogoCarrito() {
  let contenedorCarrito = document.querySelector(".carrito-container");
  let montoTotalCarrito = parseFloat(localStorage.getItem("montoTotal"));
  let cantProductosCarrito = parseInt(localStorage.getItem("cantCarrito"));
  if (cantProductosCarrito) {
    let cuentaCarritoSpan = document.querySelector("#cuenta-carrito");
    cuentaCarritoSpan.innerText = cantProductosCarrito;
  }
  const unidadesElement = document.getElementById("unidades");
  if (unidadesElement) {
    unidadesElement.innerText = cantProductosCarrito;
  }
  const precioElement = document.getElementById("precio");
  if (precioElement) {
    precioElement.innerText = montoTotalCarrito;
  }
  if (contenedorCarrito) {
    let productos = JSON.parse(localStorage.getItem("carrito")) || [];
    productos.forEach((producto) => {
      const nuevaZapa = document.createElement("div");
      nuevaZapa.classList = "tarjeta-carrito";
      nuevaZapa.dataset.id = producto.id;
      nuevaZapa.innerHTML = `
            <img src="./img/productos/${producto.img}">
            <h3>/${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <div>
            <button>-</button>
            <span class="cantidad" id="${producto.id}">${producto.cantidad}</span>
            <button>+</button>
            </div>
            `;
      contenedorCarrito.appendChild(nuevaZapa);
      nuevaZapa
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          agregarAlCarrito(producto);
        });
      nuevaZapa
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
        });
    });
  } else {
    console.log("estoy en el index");
  }
}

function agregarAlCarrito(producto) {
  let cantProductosTotal = document.querySelector("#unidades");

  let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
  let cantProductosCarrito = parseInt(localStorage.getItem("cantCarrito"));
  let precioTotalLocalStorage = parseFloat(localStorage.getItem("montoTotal"));

  if (
    carritoLocalStorage != null &&
    cantProductosCarrito != null &&
    precioTotalLocalStorage != null
  ) {
    carrito = carritoLocalStorage;
    cantProductos = cantProductosCarrito;
    precioTotal = precioTotalLocalStorage;
  }

  precioTotal += producto.precio;
  if (carrito.length == 0) {
    producto.cantidad = 1;
    carrito.push(producto);
  } else {
    let productoExistente = false;
    for (let i = 0; i < carrito.length; i++) {
      let spanCantProducto = document.getElementById(producto.id);

      if (carrito[i].id == producto.id) {
        carrito[i].cantidad += 1;
        productoExistente = true;
        if (spanCantProducto) {
          spanCantProducto.innerText = carrito[i].cantidad;
        }
        break;
      }
    }
    if (!productoExistente) {
      producto.cantidad = 1;
      carrito.push(producto);
    }
  }

  cantProductos++;
  if (cantProductosTotal || spanTotalVisual != null) {
    cantProductosTotal.innerText = cantProductos;
    spanTotalVisual.innerText = precioTotal;
  }
  cantCarrito.innerText = cantProductos;

  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("cantCarrito", JSON.stringify(cantProductos));
  localStorage.setItem("montoTotal", JSON.stringify(precioTotal));
}

function restarAlCarrito(producto) {
  let precioTotalLocalStorage = parseFloat(localStorage.getItem("montoTotal"));
  let cantProductosCarrito = parseInt(localStorage.getItem("cantCarrito"));
  let carrito = JSON.parse(localStorage.getItem("carrito"));

  let cantProductosTotal = document.querySelector("#unidades");

  if (
    carrito != null &&
    cantProductosCarrito != null &&
    precioTotalLocalStorage != null
  ) {
    cantProductos = cantProductosCarrito;
    precioTotal = precioTotalLocalStorage;
  }

  precioTotal -= producto.precio;

  for (let i = 0; i < carrito.length; i++) {
    let spanCantProducto = document.getElementById(producto.id);
    if (carrito[i].id == producto.id) {
      if ((carrito[i].cantidad - 1) > 0) {
        carrito[i].cantidad--;
        if (spanCantProducto) {
          spanCantProducto.innerText = carrito[i].cantidad;
        }
        break;
  
      } else {
        carrito.splice(i, 1);
          let contenedorProductoCarrito =
            spanCantProducto.parentNode.parentNode;
          contenedorProductoCarrito.innerHTML = "";

      }
    }
  }

  cantProductos--;
  if (cantProductosTotal || spanTotalVisual != null) {
    cantProductosTotal.innerText = cantProductos;
    spanTotalVisual.innerText = precioTotal;
  }
  cantCarrito.innerText = cantProductos;

  localStorage.setItem("montoTotal", JSON.stringify(precioTotal));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("cantCarrito", JSON.stringify(cantProductos));
}

function limpiarCarrito() {
  carrito = [];
  cantProductos = 0;
  precioTotal = 0;

  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("cantCarrito", JSON.stringify(cantProductos));
  localStorage.setItem("montoTotal", JSON.stringify(precioTotal));

  let cuentaCarritoSpan = document.querySelector("#cuenta-carrito");
  cuentaCarritoSpan.innerText = cantProductos;

  const unidadesElement = document.getElementById("unidades");
  unidadesElement.innerText = cantProductos;

  const precioElement = document.getElementById("precio");
  precioElement.innerText = precioTotal;

  let contenedorCarrito = document.querySelector(".carrito-container");
  contenedorCarrito.innerHTML = "";
}
