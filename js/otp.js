document.addEventListener('DOMContentLoaded', ()=> {

    //console.log('DOM cargado');

    // Obtener los elementos de entrada
    const numeroCedula1 = document.getElementById('numeroCedula1');
    const numeroCelular1 = document.getElementById('numeroCelular1');
    const numeroCedula2 = document.getElementById('numeroCedula2');
    const numeroCelular2 = document.getElementById('numeroCelular2');

    // Función para copiar el texto y agregar clases
    function copyAndDisable(source, target) {
        target.value = source.value;
        target.classList.add('is-valid', 'disabled');
        target.disabled = true;
    }

    // Eventos de entrada para copiar texto y agregar clases
    numeroCedula1.addEventListener('input', function() {
        copyAndDisable(numeroCedula1, numeroCedula2);
    });

    numeroCelular1.addEventListener('input', function() {
        copyAndDisable(numeroCelular1, numeroCelular2);
    });

    // Inicializar los inputs destino como deshabilitados y agregar clases
    copyAndDisable(numeroCedula1, numeroCedula2);
    copyAndDisable(numeroCelular1, numeroCelular2);

   
});


const htmlFragment = `<style>img.card-icon{max-width:48px}.modal-dialog-full{height:100%!important;width:100%!important;margin:0 auto!important;border-radius:0px!important}.modal-content-full{height:100%!important;min-height:720px!important;width:100%!important;margin:0px!important;border-radius:0px!important;border:0px!important}#otpNewForm{max-width:500px;background-color:#fff!important;margin:0 auto;padding:9px}#otpNewForm .form-header{gap:5px;text-align:center;font-size:.9em}#otpNewForm .form-header .stepIndicator{position:relative;flex:1;padding-bottom:30px}#otpNewForm .form-header .stepIndicator.active{font-weight:600}#otpNewForm .form-header .stepIndicator.finish{font-weight:600;color:#5f0f78}#otpNewForm .form-header .stepIndicator::before{content:"";position:absolute;left:50%;bottom:0;transform:translateX(-50%);z-index:9;width:20px;height:20px;background-color:#f4d0ff;border-radius:50%;border:3px solid #fcf3ff}#otpNewForm .form-header .stepIndicator.active::before{background-color:#d8b5e2;border:3px solid #f4d0ff}#otpNewForm .form-header .stepIndicator.finish::before{background-color:#5f0f78;border:3px solid #d8b5e2}#otpNewForm .form-header .stepIndicator::after{content:"";position:absolute;left:50%;bottom:8px;width:100%;height:3px;background-color:#f3f3f3}#otpNewForm .form-header .stepIndicator.active::after{background-color:#d8b5e2}#otpNewForm .form-header .stepIndicator.finish::after{background-color:#5f0f78}#otpNewForm .form-header .stepIndicator:last-child:after{display:none}#otpNewForm input{padding:12px 9px;width:100%;font-size:1em;border:1px solid #e3e3e3;border-radius:5px}#otpNewForm input:focus{border:1px solid #5f0f78;outline:0}#otpNewForm input.invalid{border:1px solid #ffaba5}#otpNewForm .step{display:none}#otpNewForm .form-footer{overflow:auto;gap:20px}#otpNewForm .form-footer button:hover{opacity:.8}#otpNewForm .form-footer #prevBtn{background-color:#fff;color:#5f0f78}</style> 
    
    <!-- Modal OPT new Aceptar -->
    <div class="modal modal-blur fade" id="modalOptNewAceptar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalOptNewAceptarLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">

                <!-- Desktop -->
                <div class="text-center p-2 d-none d-md-block">
                        <img class="pb-3" src="./images/uepacuotas.svg" style="max-width:92px;">
                        <p class="text-primary mb-3 px-3"><b>Valida tus datos y obtén el mejor plan para ti.</b> <br/>Escanea este código QR con la cámara de tu celular para continuar.</p>

                        <img src="./images/qr.png" style="max-width: 200px;">
                </div>

                <!-- Mobile -->
                <div class="text-center p-2 d-block d-md-none">
                    
                    <img class="py-3" src="./images/uepacuotas.svg" style="max-width:92px;">

                    <p class="text-primary h4 my-3 px-3">
                        Divide tu pago en cuotas que serán cargadas a tu tarjeta de manera automática.
                    </p>
                    <p>Amelia, al aplicar a Uepa Cuotas, reservarás tus boletas para Morat pagando hoy únicamente
                    la primera cuota.</p>
                    <p>Según el plan que preparemos para ti, podrás dividir esta compra en hasta 4 cuotas de RD$1,026.3</p>
                     <hr/>
                </div>
               
                <div class="w-100 mb-2 d-block d-md-none">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckNEWForm">
                        <label class="form-check-label" for="flexSwitchCheckNEWForm">Aceptar políticas de privacidad. <a href="#" class="small">[Ver más...]</a></label>
                    </div>
                </div>

            </div>
            <div class="modal-footer  d-block d-md-none"> 
                <div class="text-center w-100">
                    <button type="button" class="btn btn-primary btn-lg px-5 rounded-5 disabled" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modalNewForm">Comenzar</button>
                </div>
            </div>
        </div>
        </div>
    </div>  
    
        <!-- Modal OPT new Form -->
    <div class="modal bg-white modal-blur fade" id="modalNewForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalNewFormLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-full modal-dialog-centered">
        <div class="modal-content modal-content-full">
            <div class="modal-header border-0 d-none0">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">

                <form id="otpNewForm" action="#!">
                    
                    <div class="form-header d-flex mb-4 d-none">
                        <span class="stepIndicator small">1</span>
                        <span class="stepIndicator small">2</span>
                        <span class="stepIndicator small">3</span>
                        <span class="stepIndicator small">4</span>
                        <span class="stepIndicator small">5</span>
                    </div>
                
                    <!-- Step 1 -->
                    <div class="step">
                        <div class="text-center my-4">
                            <img src="./images/card-cuotas.svg" class="mb-2" style="max-width:128px; margin: 0 auto; display: block;"/>
                            <small style="font-size: 12px;" class="small mb-4">Completa y verifica tus datos</small>
                        </div>
                        <div class="mb-3">
                            <input id="numeroCedula1" class="form-control bg-light" type="tel" placeholder="Número de Cédula" oninput="this.className = ''" name="cedula">
                        </div>
                        <div class="mb-3">
                            <input id="numeroCelular1" class="form-control bg-light" type="tel" placeholder="Número de Celular" oninput="this.className = ''" name="tel">
                        </div>
                        <small>*Validaremos tu teléfono con un código OTP</small>
                        <div class="text-center w-100 mt-3">
                            <button class="btn btn-primary btn-lg px-5 rounded-5" type="button" id="nextBtn" onclick="nextPrev(1)">Continuar</button>
                        </div>
                    </div>
                
                    <!-- step 2 -->
                    <div class="step">

                        <div class="text-center my-4">
                            <img src="./images/sms-cuotas.svg" class="mb-2" style="max-width:128px; margin: 0 auto; display: block;"/>
                            <p style="font-size: 12px;" class="small mb-3">Ingresa el código</p>
                            <p style="font-size: 10px;" class="small mb-3">Digita el código de 4 dígitos que te hemos enviado vía SMS</p>
                        </div>
                    
                        <div class="row mb-3">
                            <div class="col-3">
                                <input type="tel" maxlength="1" class="text-center form-control bg-light" placeholder=" " aria-label="0" aria-describedby="basic-addon1" oninput="moveToNext(this, 'input2')" id="input1" name="input1">
                            </div>
                            <div class="col-3">
                                <input type="tel" maxlength="1" class="text-center form-control bg-light" placeholder=" " aria-label="0" aria-describedby="basic-addon2" oninput="moveToNext(this, 'input3')" id="input2" name="input2">
                            </div>
                            <div class="col-3">
                                <input type="tel" maxlength="1" class="text-center form-control bg-light" placeholder=" " aria-label="0" aria-describedby="basic-addon3" oninput="moveToNext(this, 'input4')" id="input3" name="input3">
                            </div>
                            <div class="col-3">
                                <input type="tel" maxlength="1" class="text-center form-control bg-light" placeholder=" " aria-label="0" aria-describedby="basic-addon4" id="input4" name="input4">
                            </div>
                        </div>

                        <div class="text-center w-100 mb-3">
                            <small>¿No recibiste tu código?, <span>Reenviar</span></small>
                        </div>

                        <div class="text-center w-100">
                            <!--<button class="btn btn-secondary btn-lg" type="button" id="prevBtn" onclick="nextPrev(-1)">Volver</button>-->
                            <button class="btn btn-primary btn-lg px-5 rounded-5" type="button" id="nextBtn" onclick="nextPrev(1)">Continuar</button>
                        </div>

                    </div>
                
                    <!-- Step 3 -->
                    <div class="step">
                        <div class="text-center my-4">
                            <img src="./images/card-cuotas.svg" class="mb-2" style="max-width:128px; margin: 0 auto; display: block;"/>
                            <small style="font-size: 12px;" class="small mb-4">Completa y verifica tus datos</small>
                        </div>
                        <div class="mb-3">
                            <input id="numeroCedula2" class="form-control bg-light" type="tel" placeholder="Cédula" oninput="this.className = ''" name="cedula">
                        </div>
                        <div class="mb-3">
                            <input class="form-control bg-light disabled" type="text" placeholder="Nombre" oninput="this.className = ''" name="fullname">
                        </div>
                        <div class="mb-3">
                            <input class="form-control bg-light" type="text" placeholder="Dirección" oninput="this.className = ''" name="address">
                        </div>
                        <div class="mb-3">
                            <input id="numeroCelular2" class="form-control bg-light disabled" type="tel" placeholder="Celular" oninput="this.className = ''" name="mobile">
                        </div>
                        <div class="text-center w-100 mt-3">
                            <button class="btn btn-primary btn-lg px-5 rounded-5" type="button" id="nextBtn" onclick="nextPrev(1)">Continuar</button>
                        </div>
                    </div>
                
                    <!-- step 4 -->
                    <div class="step">
                        <div class="text-center my-4">

                            <img src="./images/check-cuotas.svg" class="mb-2" style="max-width:128px; margin: 0 auto; display: block;"/>
                        </div>
                        <div class="mb-3 text-center">
                            <p class="h4 text-primary mb-3">¡Genial! Tus datos han sido validados correctamente</p>
                        </div>

                        <div class="text-center w-100 mt-3">
                            <!--<button class="btn btn-secondary btn-lg" type="button" id="prevBtn" onclick="nextPrev(-1)">Volver</button>-->
                            <button class="btn btn-primary btn-lg px-5 rounded-5" type="button" id="nextBtn" onclick="nextPrev(1)">Continuar</button>
                        </div>

                    </div>

                    <!-- step 5 -->
                    <div class="step">
                    
                        <div class="mb-3 text-center"> 
                            
                            <img class="py-3" src="./images/camera_front.svg" style="max-width: 128px;">

                            <p class="h4 text-primary my-3 px-3">Por tu seguridad, y para que tu plan de pagos sea más personalizado, validaremos rápidamente tu identidad.</p>
                            <p style="font-size: 12px;" class="small text-secondary mb-3">*Asegúrate de estar en un lugar con buena iluminación*</p>
                        </div>
                        <div class="mb-3 text-center">
                            <button class="btn btn-primary btn-lg px-5 rounded-5" type="button" id="vamosBtn">Vamos</button>
                        </div>  
                    </div>

                </form>

            </div>
        </div>
        </div>
    </div>

    <!-- Modal LOW SCORE -->
    <div class="modal modal-blur fade" id="modalOptLowScore" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalOptLowScoreLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="text-center p-2">
                    
                    <img class="py-3 mb-3" src="./images/uepacuotas.svg" style="max-width:92px;">

                    <p>Amelia, unos pasos más y estaremos listos. Recuerda que tus boletas están reservadas hasta completar todo el proceso.</p>
                    <p class="small">Debes descargar nuestra App Validapp y seguir los pasos que te indicaremos.</p>
                </div>
                <hr/>
                <div class="w-100 mb-2 text-center">
                    <p>Tu código de aplicación es: XXXX</p>
                </div>

            </div>
            <div class="modal-footer"> 
                <div class="text-center w-100">
                    <button type="button" class="btn btn-primary btn-lg px-5 rounded-5">Descargar</button>
                </div>
            </div>
        </div>
        </div>
    </div>  

    <!-- Modal NO OFFER -->
    <div class="modal modal-blur fade" id="modalOptNoOffer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalOptNoOfferLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="text-center p-2">
                    
                    <img class="py-3 mb-3" src="./images/uepacuotas.svg" style="max-width:92px;">

                  
                    <p>Amelia, en esta ocasión no tenemos un plan de pagos disponible que se ajuste a tus necesidades.</p>
                    <p>De todas formas aún tienes la oportunidad de pagar las boletas que seleccionaste.</p>
                </div>
        

            </div>
            <div class="modal-footer"> 
                <div class="text-center w-100">
                    <button type="button" class="btn btn-primary btn-lg px-5 rounded-5">Reservar mis boletas</button>
                </div>
            </div>
        </div>
        </div>
    </div>  
    `;

    // Insertar el fragmento después de <body>
    document.body.insertAdjacentHTML('afterbegin', htmlFragment);


    // Función para habilitar el botón continuar si el checkbox está seleccionado
    const checkbox = document.getElementById('flexSwitchCheckNEWForm');
    const button = document.querySelector('button[data-bs-target="#modalNewForm"]');
    
    if (checkbox && button) {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                button.classList.remove('disabled');
            } else {
                button.classList.add('disabled');
            }
        });
    }

    // Funciones para manejar los pasos del formulario
    let currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    function showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("step");
        x[n].style.display = "block";
        //... and fix the Previous/Next buttons:
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Verificar";
        } else {
            document.getElementById("nextBtn").innerHTML = "Continuar";
        }
        //... and run a function that will display the correct step indicator:
        fixStepIndicator(n);
    }

    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("step");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form...
        if (currentTab >= x.length) {
            // ... the form gets submitted:
            document.getElementById("otpNewForm").submit();
            return false;
        }
        // Otherwise, display the correct tab:
        showTab(currentTab);
    }

    function validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("step");
        y = x[currentTab].getElementsByTagName("input");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false
                valid = false;
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("stepIndicator")[currentTab].className += " finish";
        }
        return valid; // return the valid status
    }

    function fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i, x = document.getElementsByClassName("stepIndicator");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class on the current step:
        x[n].className += " active";
    }


    // Esta función se encarga de mover entre inputs y asegurarse de que solo se ingresen números
    function moveToNext(current, nextFieldId) {
        // Eliminar cualquier carácter no numérico
        current.value = current.value.replace(/\D/g, '');

        if (current.value.length >= current.maxLength) {
            const nextField = document.getElementById(nextFieldId);
            if (nextField) {
                nextField.focus();
            }
        }
    }

    // Agregar evento de input para asegurarse de que solo se ingresen números
    document.addEventListener('DOMContentLoaded', function() {
        const inputs = document.querySelectorAll('input[type="tel"], input[type="number"]');
        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '');
            });
        });
    });