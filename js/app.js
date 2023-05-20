/////Variables
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

////Mostrar y ocultar carrito
const mostrarCarritoBtn = document.querySelector('.mostrarCarrito');
const carritoElemento = document.querySelector('.carrito');

mostrarCarritoBtn.addEventListener('click', () => {
    if (carritoElemento.style.display === 'block') {
        carritoElemento.style.display = 'none'; 
    } else {
        carritoElemento.style.display = 'block'; 
    }
});


///Cargar los datos del archivo .json
fetch('data/producto.json')
    .then(response => response.json())
    .then(data => {
        const productoLista = document.getElementById('productos');

        ////iterar sobre los productos y pasarlos al html
        data.forEach(producto => {
            /// div del producto
            const productoElemento = document.createElement('div');
            productoElemento.className = 'producto';

            ///// imagen del producto
            const imagenElemento = document.createElement('img');
            imagenElemento.src = producto.imagen;
            productoElemento.appendChild(imagenElemento);

            ////Nombre del producto
            const nombreElemento = document.createElement('h3');
            nombreElemento.textContent = producto.nombre;
            productoElemento.appendChild(nombreElemento);

            ///precio del producto
            const precioElemento = document.createElement('p');
            precioElemento.textContent = '$' + producto.precio;
            productoElemento.appendChild(precioElemento);

            ////  div contenedor para la cantidad
            const divCantidad = document.createElement('div');
            divCantidad.className = 'divCantidad';

            //// input para la cantidad
            const cantidadInput = document.createElement('input');
            cantidadInput.type = 'number';
            cantidadInput.min = '1';
            cantidadInput.value = '1';
            divCantidad.appendChild(cantidadInput);

            /// texto
            const textoUnidad = document.createTextNode('Cajones');
            divCantidad.appendChild(textoUnidad);

            /// final del div del contenedor de cantidad
            productoElemento.appendChild(divCantidad);

            //// Agregar la cantidad x cajon
            const cantidadElement = document.createElement('h4');
            cantidadElement.textContent = "de " + producto.cantidadXCajon + "kg";
            productoElemento.appendChild(cantidadElement);

            ///boton de agregar al carrito
            const addBoton = document.createElement('button');
            addBoton.textContent = 'Agregar al carrito';
            productoElemento.appendChild(addBoton);

            addBoton.addEventListener('click', () => {
                const cantidad = parseInt(cantidadInput.value); 
                const subtotal = producto.precio * cantidad; 

                const productoSeleccionado = {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: cantidad,
                    subtotal: subtotal
                };

                ///push al carrito
                carrito.push(productoSeleccionado);

                ////total del carrito
                total += subtotal;

                //se guardan los cambios en el carrito y el total en el localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));
                localStorage.setItem('total', total.toString());

                ////Actualizar el carrito
                actualizarCarrito();

            });

            ///producto al contenedor
            productoLista.appendChild(productoElemento);
        });
        //// volvi a actualizar el carrito porque me generaba un error en el mismo
        actualizarCarrito();
    })
    .catch(error => console.log(error));



//// funcion para actualizar el carrito
function actualizarCarrito() {
    const carritoElemento = document.getElementById('carrito');

    ///// Limpiar el carrito
    carritoElemento.innerHTML = '';

    carrito.forEach(producto => {
        ///div del producto
        const productoCarrito = document.createElement('div');
        productoCarrito.className = 'productoCarrito';

        //// nombre del producto
        const nombreElemento = document.createElement('h3');
        nombreElemento.textContent = producto.nombre;
        productoCarrito.appendChild(nombreElemento);

        ///// cantidad y subtotal del producto
        const cantidadSubtotalElemento = document.createElement('p');
        cantidadSubtotalElemento.textContent = `${producto.cantidad}u x $${producto.precio} = $${producto.subtotal}`;
        productoCarrito.appendChild(cantidadSubtotalElemento);

        //boton eliminar producto
        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.addEventListener('click', () => eliminarProductoCarrito(producto.id));
        productoCarrito.appendChild(eliminarBoton);

        //// agregar el producto al carrito
        carritoElemento.appendChild(productoCarrito);
    });

    ///// actualizar el total del carrito
    const totalElemento = document.getElementById('total');
    totalElemento.textContent = 'Total: $' + total;
    totalElemento.className = "total"

    /// agregar el boton de comprar
    const comprarBoton = document.createElement('button');
    comprarBoton.textContent = 'Comprar';
    comprarBoton.addEventListener('click', comprarCarrito);
    carritoElemento.appendChild(comprarBoton);
    comprarBoton.className = "pagarLimpiar";

    /// agregar el boton de limpiar el carrito
    const limpiarBoton = document.createElement('button');
    limpiarBoton.textContent = 'Limpiar carrito';
    limpiarBoton.addEventListener('click', limpiarCarrito);
    carritoElemento.appendChild(limpiarBoton);
    limpiarBoton.className = "pagarLimpiar limpiar";
}

///// funcion para eliminar un producto del carrito
function eliminarProductoCarrito(id) {
    //// buscar el id del producto
    const index = carrito.findIndex(producto => producto.id === id);

    if (index !== -1) {
        ////eliinar el subtotal del producto eliminado al total del carrito
        total -= carrito[index].subtotal;

        ///eliminar el producto del carrito
        carrito.splice(index, 1);

        ////se guardan los cambios en el carrito y el total en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total.toString());

        /// actualizar carrito
        actualizarCarrito();
    }
}

////Funcion para comprar
function comprarCarrito() {
    /// Sweet alert
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Ir a pagar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'compra.html';
        }
    })
}


//// funcion para limpiar carrito
function limpiarCarrito() {
    /// limpiar carrito y localstorage
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');

    //// volver a 0 las variables
    carrito = [];
    total = 0;

    /// actualizar carrito
    actualizarCarrito();
}

/////// tomar los input de compra.html

const nombreInput = document.getElementById('nombre');
const direccionInput = document.getElementById('direccion');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');


///// en base al input de tipo boton en compra.html se procede a realizar la "accion de compra"
const realizarPedidoBtn = document.getElementById('realizarPedido');

realizarPedidoBtn.addEventListener('click', () => {
    if (nombreInput.value && direccionInput.value && telefonoInput.value && emailInput.value) {
        Swal.fire({
            title: '¿Estás seguro de realizar la compra?',
            text: 'Una vez realizada, no se podrá deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, realizar compra',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Pago realizado con éxito!',
                    text: 'Gracias por su compra.',
                    icon: 'success'
                }).then(() => {
                    window.location.href = 'index.html';
                    limpiarCarrito();
                });
            }
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, complete el formulario.',
            icon: 'error'
        });
    }
});


//// actualizar carrito
actualizarCarrito();