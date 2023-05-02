///variables 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = localStorage.getItem("total") || 0;

///funcion para agregar los productos al carrito
function agregarProducto(evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const precio = parseInt(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    const completarCampos = nombre && !isNaN(precio) && !isNaN(cantidad) ? true : false;

    if (!completarCampos) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const producto = new Producto(nombre, precio, cantidad);
    carrito.push(producto);
    total = parseFloat(total) + (precio * cantidad);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", total);
    mostrarCarrito();
    totalActualizado();
    document.getElementById("formulario").reset();
}

////funcion para la lista del carrito
function mostrarCarrito() {
    const carritoElemento = document.getElementById("carrito");
    carritoElemento.innerHTML = "";

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}`;
        carritoElemento.appendChild(li);
    });
}

function totalActualizado() {
    const totalElemento = document.getElementById("total");
    totalElemento.innerHTML = `${total}`;
}

///funcion para pagar
function pagarCarrito() {
    if (confirm("¿Desea realizar la compra?")) {
        window.location.href = "compra.html";
        limpiarCarrito();
    }
}

////funcion para limpiar el carrito
function limpiarCarrito() {
    carrito.length = 0;
    total = 0;
    localStorage.removeItem("carrito");
    localStorage.removeItem("total");
    mostrarCarrito();
    totalActualizado();
}

/// funcion para el total
function calcularTotal() {
    return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}


//// los EventListener
document.getElementById("formulario").addEventListener("submit", agregarProducto);
document.getElementById("pagar").addEventListener("click", pagarCarrito);
document.getElementById("limpiar").addEventListener("click", limpiarCarrito);
window.addEventListener("load", mostrarCarrito);
window.addEventListener("load", totalActualizado);
