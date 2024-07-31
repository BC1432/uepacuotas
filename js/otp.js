document.addEventListener('DOMContentLoaded', ()=> {
    // Fragmento de HTML que deseas agregar
    const htmlFragment = `<style>img.card-icon{max-width:48px}.modal-dialog-full{height:100%!important;width:100%!important;margin:0 auto!important;border-radius:0px!important}.modal-content-full{height:100%!important;min-height:720px!important;width:100%!important;margin:0px!important;border-radius:0px!important;border:0px!important}#otpNewForm{max-width:500px;background-color:#fff!important;margin:0 auto;padding:9px}#otpNewForm .form-header{gap:5px;text-align:center;font-size:.9em}#otpNewForm .form-header .stepIndicator{position:relative;flex:1;padding-bottom:30px}#otpNewForm .form-header .stepIndicator.active{font-weight:600}#otpNewForm .form-header .stepIndicator.finish{font-weight:600;color:#5f0f78}#otpNewForm .form-header .stepIndicator::before{content:"";position:absolute;left:50%;bottom:0;transform:translateX(-50%);z-index:9;width:20px;height:20px;background-color:#f4d0ff;border-radius:50%;border:3px solid #fcf3ff}#otpNewForm .form-header .stepIndicator.active::before{background-color:#d8b5e2;border:3px solid #f4d0ff}#otpNewForm .form-header .stepIndicator.finish::before{background-color:#5f0f78;border:3px solid #d8b5e2}#otpNewForm .form-header .stepIndicator::after{content:"";position:absolute;left:50%;bottom:8px;width:100%;height:3px;background-color:#f3f3f3}#otpNewForm .form-header .stepIndicator.active::after{background-color:#d8b5e2}#otpNewForm .form-header .stepIndicator.finish::after{background-color:#5f0f78}#otpNewForm .form-header .stepIndicator:last-child:after{display:none}#otpNewForm input{padding:12px 9px;width:100%;font-size:1em;border:1px solid #e3e3e3;border-radius:5px}#otpNewForm input:focus{border:1px solid #5f0f78;outline:0}#otpNewForm input.invalid{border:1px solid #ffaba5}#otpNewForm .step{display:none}#otpNewForm .form-footer{overflow:auto;gap:20px}#otpNewForm .form-footer button:hover{opacity:.8}#otpNewForm .form-footer #prevBtn{background-color:#fff;color:#5f0f78}</style> 
    
    <!-- Modal OPT new Aceptar -->
    <div class="modal modal-blur fade" id="modalOptNewAceptar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalOptNewAceptarLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0">
                <div class="text-center p-2">
                    
                    <img class="py-3" src="./images/uepacuotas.svg" style="max-width:92px;">

                    <p class="text-primary h4 my-3 px-3">
                        Divide tu pago en cuotas que serán cargadas a tu tarjeta de manera automática.
                    </p>
                    <p>Amelia, al aplicar a Uepa Cuotas, reservarás tus boletas para Morat pagando hoy únicamente
                    la primera cuota.</p>
                    <p>Según el plan que preparemos para ti, podrás dividir esta compra en hasta 4 cuotas de RD$1,026.3</p>
                </div>
                <hr/>
                <div class="w-100 mb-2">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckNEWForm">
                        <label class="form-check-label" for="flexSwitchCheckNEWForm">Aceptar políticas de privacidad. <a href="#" class="small">[Ver más...]</a></label>
                    </div>
                </div>

            </div>
            <div class="modal-footer"> 
                <div class="text-center w-100">
                    <button type="button" class="btn btn-primary btn-lg px-5 rounded-5 disabled" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modalNewForm">Comenzar</button>
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
   
});




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

// Restricción de entrada de teléfono a solo números
document.addEventListener('DOMContentLoaded', function() {
    const telInputs = document.querySelectorAll('input[type="tel"]');

    telInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });

        // Opcional: establecer patrón para mostrar solo el teclado numérico en dispositivos móviles
        input.setAttribute('pattern', '[0-9]*');
    });
});

// Esta función se encarga de mover entre inputs
function moveToNext(current, nextFieldId) {
    if (current.value.length >= current.maxLength) {
        const nextField = document.getElementById(nextFieldId);
        if (nextField) {
            nextField.focus();
        }
    }
}

// Copiar valor de un input a otro al hacer clic en "Continuar" del Step 1
document.addEventListener('DOMContentLoaded', function() {
    const inputStep1 = document.getElementById('celularOTPnew');
    const inputStep3 = document.getElementById('celularStep3');
    const nextBtnStep1 = document.getElementById('nextBtnStep1');

    if (nextBtnStep1) {
        nextBtnStep1.addEventListener('click', function() {
            inputStep3.value = inputStep1.value;
        });
    }
});