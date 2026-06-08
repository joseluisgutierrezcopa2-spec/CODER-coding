let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarPantalla();
}

function actualizarPantalla() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalPrecio = document.getElementById("total-precio");

    listaCarrito.innerHTML = "";

    carrito.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} — ${item.precio} Bs.`;
        listaCarrito.appendChild(li);
    });

    totalPrecio.textContent = total;
}

function confirmarPedido() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega al menos un platillo antes de continuar.");
        return;
    }

    const numeroPedido = Math.floor(1000 + Math.random() * 9000);

    localStorage.setItem("totalPedido", total);
    localStorage.setItem("numeroPedido", numeroPedido);

    alert(`¡Pedido Procesado!\nCódigo: #${numeroPedido}\nTotal a pagar: ${total} Bs.`);

    window.location.href = "pagina2.html";
}