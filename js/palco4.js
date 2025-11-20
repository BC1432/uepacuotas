/* UEPA CUOTAS 3.4 - Palco4 */
// Instalar en Palco4 - Mostrar banner y cuotas dinámicas según evento y fecha
// Requiere variable global EventosBuscador y arrayVentasEnCarrito
document.addEventListener('DOMContentLoaded', function() {
    
    let idEventoBuscado;

    // Primera verificación: buscar en arrayVentasEnCarrito
    if (arrayVentasEnCarrito && arrayVentasEnCarrito.length > 0 && arrayVentasEnCarrito[0].detalle && arrayVentasEnCarrito[0].detalle.length > 0) {
        idEventoBuscado = arrayVentasEnCarrito[0].detalle[0].idEvento;
    } else {
        // Segunda verificación: buscar en el DOM el idEvento en los enlaces
        const enlaces = document.querySelectorAll('a[href*="comprarEvento?idEvento="]');
        if (enlaces.length > 0) {
            const urlParams = new URLSearchParams(enlaces[0].href.split('?')[1]);
            idEventoBuscado = urlParams.get('idEvento');
        } else {
            // Tercera verificación: buscar en el elemento meta del DOM
            const metaTags = document.querySelectorAll('meta[property="og:url"]');
            for (let metaTag of metaTags) {
                if (metaTag.content.includes('comprarEvento?idEvento=')) {
                    const urlParams = new URLSearchParams(metaTag.content.split('?')[1]);
                    idEventoBuscado = urlParams.get('idEvento');
                    break; // Salir del bucle una vez que se encuentra el idEvento
                }
            }
        }
    }

    console.log('Id del evento buscado:', idEventoBuscado);

    if (idEventoBuscado) {
        buscarEventoPorId(parseInt(idEventoBuscado));
    } else {
        console.log('No se pudo encontrar un idEvento para buscar.');
    }

    function buscarEventoPorId(idEvento) {
        const eventoEncontrado = EventosBuscador.find(evento => evento.idEvento === idEvento);
        if (eventoEncontrado) {
            console.log('Evento encontrado:', eventoEncontrado);
            // Aquí puedes seguir con la lógica de comprobación de fechas y demás
            
            const fechaHastaEvento = new Date(eventoEncontrado.fechaHasta);
            const hoy = new Date();
            const diferenciaTiempo = fechaHastaEvento.getTime() - hoy.getTime();
            const diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
    
            if (diferenciaDias > 19) {
                console.log('El evento aplica. Fecha hasta es mayor a 19 días a partir de hoy.');
                
                
                    // BEGIN BANNER
                    mostrarBannerCuotas();
    
                                    // BEGIN CUOTAS
                    mostrarCuotas();
    
    
            } else {
                console.log('El evento no aplica. Fecha hasta es menor o igual a 19 días a partir de hoy.');
            }
        } else {
            console.log('Evento no encontrado.');
        }
    }

    function mostrarCuotas() {
        console.log('MOSTRAR CUOTAS');
        
    // Obtener el elemento con el monto total
    var totalElement = document.querySelector('.total-value .p4money');
    if (totalElement) {
        var totalAmount = parseFloat(totalElement.getAttribute('data-amount'));

        if (totalAmount >= 1000 && totalAmount <= 100000) {
            // Dividir el monto total entre 4 y luego aplicar un 20% de interés
            var cuotaBase = totalAmount / 4;
            var cuotasDesde = (cuotaBase * 1.20).toFixed(2); // Aplica 20% de interés

            // Formatear el monto a formato de moneda
            var formattedCuotasDesde = formatCurrency(cuotasDesde);

            console.log('formattedCuotasDesde: ', formattedCuotasDesde);

            // Crear el div para mostrar las cuotas
            var cuotasDiv = document.createElement('div');
            cuotasDiv.className = 'row list-details-product box-cuotas';
            cuotasDiv.innerHTML = `<style>#precioEntradas{display:none;}</style>
                <div class="large-6 medium-6 small-6 columns text-cuotas">
                    <img class="icon-cuotas" src="https://uepatickets.com/backoffice/empresa/3/logo-uepacuotas.png"/>
                </div>
                <div class="large-6 medium-6 small-6 columns text-right">
                    <small class="text-cuotas d-block">Cuotas desde:</small>
                    <span class="text-cuotas text-bold d-block">${formattedCuotasDesde}</span>
                </div>
            `;

            // Insertar el div de cuotas justo antes del div del total
            var totalDiv = document.querySelector('.row.element-ticket-resume');
            totalDiv.parentNode.insertBefore(cuotasDiv, totalDiv);
            
            
        }
    }
        

    function formatCurrency(number) {
        return 'RD$' + parseFloat(number).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }


    // Seleccionar todos los elementos con las clases
    var cuotasWidget = document.querySelectorAll('.large-4.medium-4.columns.right.hide-for-small');

    // Iterar a través de cada elemento y remover la clase 'hide-for-small'
    cuotasWidget.forEach(function(element) {
        element.classList.remove('hide-for-small');
    });


        
    } // mostrarCuotas()

    function mostrarBannerCuotas() {     
            var bannerDiv = document.createElement('div');
            bannerDiv.className = 'my-3 w-100';
            bannerDiv.id = 'banner_uepacuotas';
            bannerDiv.innerHTML = '<a target="_blank" href="https://www.uepacuotas.com/?v=3.4"><img src="https://uepatickets.com/backoffice/empresa/3/banner_uepacuotas.com___1130x90px.png" alt="Uepa Cuotas" class="shadow border-3"></a>';
            var headerDesktop = document.getElementById('header-desktop');
            if (headerDesktop) {
                headerDesktop.parentNode.insertBefore(bannerDiv, headerDesktop.nextSibling);
            }
        }

}); /* END UEPA CUOTAS 3.4 */



/* PROMO CODES */
// Instalar en Palco4 - PROMO CODE DINAMICO con IndexedDB y control de frecuencia
// Esto muestra un mensaje personalizado desde Admin Beta
(function () {
    const DB_NAME = 'promoMensajesDB';
    const STORE_NAME = 'mensajes';
    const LAST_SYNC_KEY = 'promoMensajesLastSync';
    const SYNC_INTERVAL_MINUTES = 3;
    // Development version (solo ID+MSJ)
    //const API_URL = "https://script.google.com/macros/s/AKfycbzk4GKEcElhmdEcP1sARsYXWoBlMm-KRunnBqfRu5ripWj24idizsey-0NLkZgZB_tL/exec?view=dashboard";
    // Stable version 1
    const API_URL = "https://script.google.com/macros/s/AKfycbyEXC2_t9KwvuQO1H4zcUA2_5U7PWtkdTotmO9lUt2wJ9bqMDCv2sy95sePQRT5JE8w/exec?view=dashboard";
  
    function openDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onerror = () => reject("❌ Error abriendo IndexedDB");
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "eventIds" });
          }
        };
      });
    }
  
    function guardarMensajes(db, mensajes) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        mensajes.forEach(item => {
          store.put({ eventIds: String(item.eventIds).trim(), mensaje: item.mensaje });
        });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject("❌ Error al guardar en IndexedDB");
      });
    }
  
    function obtenerMensaje(db, eventId) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(String(eventId).trim());
        req.onsuccess = () => resolve(req.result?.mensaje || null);
        req.onerror = () => resolve(null);
      });
    }
  
    async function sincronizarMensajesSiEsNecesario(db) {
      const lastSync = localStorage.getItem(LAST_SYNC_KEY);
      const now = Date.now();
      if (lastSync && now - parseInt(lastSync) < SYNC_INTERVAL_MINUTES * 60 * 1000) return;
  
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        await guardarMensajes(db, data);
        localStorage.setItem(LAST_SYNC_KEY, now.toString());
      } catch (err) {
        console.warn("❌ Error sincronizando mensajes:", err);
      }
    }
  
    function mostrarMensajeEnDOM(mensaje) {
      if (!mensaje) return;
  
      let promoLink = document.getElementById("link-modal-loyalty");
      if (promoLink) promoLink.innerHTML = mensaje;
  
      let link = document.getElementById("link-modal-loyalty_no_zones") ||
                 document.getElementById("link-modal-loyalty") ||
                 document.getElementById("link-modal-loyalty-content") ||
                 document.getElementById("link-modal-loyalty-content_ticket-type");
  
      if (link) {
        let linkElement = link.tagName === "A" ? link : link.querySelector("a");
        if (linkElement) linkElement.innerHTML = mensaje;
      }

      // >>> AÑADIDO AQUÍ <<<
      try {
        var ticketDiv = document.getElementById("link-modal-loyalty-content_ticket-type");
        if (ticketDiv) {
          var anchor = ticketDiv.querySelector("a");
          if (anchor) {
            var tmp = document.createElement("div");
            tmp.innerHTML = mensaje || "";
            var plain = (tmp.textContent || tmp.innerText || "").trim();
            if (plain) {
              anchor.textContent = plain;
              anchor.title = plain;
              anchor.setAttribute("aria-label", plain);
              anchor.dataset._uepaAmexSet = "1";
            }
          }
        }
      } catch (ex) {
        console.warn("Amex override error:", ex);
      }
      // <<< FIN AÑADIDO <<<
  
      let inputField = document.getElementById("dNumTarjetaFidelizacionBuscar");
      if (inputField) inputField.setAttribute("placeholder", "Ingrese aquí el código");
    }
  
    document.addEventListener("DOMContentLoaded", () => {
      const interval = setInterval(async () => {
        if (typeof dataLayerP4 === "undefined" || !dataLayerP4.eventId) return;
  
        const db = await openDB();
        await sincronizarMensajesSiEsNecesario(db);
  
        const mensaje = await obtenerMensaje(db, dataLayerP4.eventId);
        mostrarMensajeEnDOM(mensaje);
        clearInterval(interval);
      }, 500);
    });
  })();
  // END PROMO CODE DINAMICO