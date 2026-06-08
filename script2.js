// Al cargar la página, recuperamos los datos guardados en LocalStorage por la Pagina 1
document.addEventListener("DOMContentLoaded", () => {
    const numPedido = localStorage.getItem("numeroPedido");
    const totalPedido = localStorage.getItem("totalPedido");

    const pedidoIdTxt = document.getElementById("pedido-id");
    const pedidoTotalTxt = document.getElementById("pedido-total");

    if (numPedido && totalPedido) {
        pedidoIdTxt.textContent = `Pedido #${numPedido} Registrado`;
        pedidoTotalTxt.textContent = totalPedido;
    } else {
        pedidoIdTxt.textContent = "Ningún pedido activo";
        pedidoTotalTxt.textContent = "0";
    }
});

function rastrearMoto() {
    const contenedorGps = document.getElementById("pantalla-gps");

    contenedorGps.innerHTML = `<p style="text-align:center; font-weight:bold;">Conectando con el satélite del repartidor... 🛰️</p>`;

    const urlAPI = "https://ipapi.co/json/";

    fetch(urlAPI)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Error en la respuesta del servidor de mapas.");
            }
            return respuesta.json();
        })
        .then(data => {
            const ciudad = data.city || "La Paz";
            const region = data.region || "La Paz";
            const pais = data.country_name || "Bolivia";
            const latitud = data.latitude || "-16.5000";
            const longitud = data.longitude || "-68.1500";
            const proveedorInternet = data.org || "Servidor Local";

            contenedorGps.innerHTML = `
                <div class="gps-dato-linea"><strong>Estado del Repartidor:</strong> <span class="status-en-camino">En Camino 🏍️</span></div>
                <div class="gps-dato-linea"><strong>Ciudad / Región:</strong> ${ciudad}, ${region} (${pais})</div>
                <div class="gps-dato-linea"><strong>Coordenadas GPS:</strong> Lat: ${latitud} | Lon: ${longitud}</div>
                <div class="gps-dato-linea"><strong>Nodo de Red Detectado:</strong> ${proveedorInternet}</div>
                <div class="gps-dato-linea" style="border:none; margin-top:10px; font-size:13px; color:#555;">
                    <em>*Nota: Los datos de rastreo han sido obtenidos dinámicamente a través de fetch() desde ipapi.co de forma exitosa.*</em>
                </div>
            `;
        })
        .catch(error => {
            console.error("Hubo un problema con la petición fetch:", error);
            contenedorGps.innerHTML = `
                <p style="color:red; font-weight:bold; text-align:center;">
                    ❌ Error al conectar con el GPS: No se pudo obtener la ubicación actual del repartidor.
                </p>
            `;
        });
}