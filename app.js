//MENSAJE DE BIENVENIDA

alert("Bienvenido a la tienda de VERDULERÍA ONLINE")


//SELECCION DE PRODUCTOS Y PRECIOS

function agregarProductos() {
    let carrito = [];
    do {
        let nombre = prompt("Ingresá el nombre del producto:");
        let precio = parseFloat(prompt("Ingresá el precio del producto:"));
        while (isNaN(precio) || precio <= 0) {
            precio = parseFloat(prompt("Ingresá un precio válido y mayor que 0:"));
        }
        let cantidad = parseInt(prompt("Ingresá la cantidad de productos:")); 
        while (isNaN(cantidad) || cantidad <= 0) {
            cantidad = parseInt(prompt("Ingresá una cantidad válida y mayor que 0:"));
        }
        let producto = new Producto(nombre, precio, cantidad); 
        carrito.push(producto);
        var respuesta = prompt("¿Deseas agregar otro producto? (s/n)");
    } while (respuesta.toLowerCase() === 's');
    return carrito;
}

let carrito = agregarProductos();


//TICKET

let listaProductos = document.createElement("ul");
document.getElementById("carrito").appendChild(listaProductos);

let total = 0;

carrito.forEach(function (productoActual) {
    let lista = document.createElement("li");
    let texto = document.createTextNode(productoActual.nombre + " x " + productoActual.cantidad + ": $" + 
    (productoActual.precio * productoActual.cantidad).toFixed(2));
    lista.appendChild(texto);
    listaProductos.appendChild(lista);
    total += productoActual.precio * productoActual.cantidad;
});

let elementoTotal = document.createElement("p");
let textoTotal = document.createTextNode("Total: $" + total.toFixed(2));
elementoTotal.appendChild(textoTotal);
listaProductos.appendChild(elementoTotal);


//BOTON

let botonComprar = document.createElement("button");
let textoComprar = document.createTextNode("Comprar ahora");
botonComprar.appendChild(textoComprar);
botonComprar.addEventListener("click", function () {
    if (confirm("¿Desea realizar la compra?")) {
        window.location.href = "compra.html";
    }
});


document.getElementById("boton").appendChild(botonComprar);

