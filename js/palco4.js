// UEPA CUOTAS 3.4 - Palco4 
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
            bannerDiv.innerHTML = '<a target="_blank" href="https://www.uepacuotas.com/"><img src="https://uepatickets.com/backoffice/empresa/3/banner_uepacuotas.com___1130x90px.png" alt="Uepa Cuotas" class="shadow border-3"></a>';
            var headerDesktop = document.getElementById('header-desktop');
            if (headerDesktop) {
                headerDesktop.parentNode.insertBefore(bannerDiv, headerDesktop.nextSibling);
            }
        }

});