// OPT new ALL
document.addEventListener('DOMContentLoaded', function() {
    const takePhotoButton = document.getElementById('takePhoto');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photosContainer = document.getElementById('photos');
    let stream;

    const startCamera = async () => {
        try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        } catch (error) {
        console.error("Error accessing the camera: ", error);
        }
    };

    const stopCamera = () => {
        if (stream) {
        stream.getTracks().forEach(track => track.stop());
        }
    };

    const takePhoto = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.className = 'img-fluid my-2 rounded-3';
        photosContainer.appendChild(img);
    };

    const cameraModalElement = document.getElementById('cameraModal');
    cameraModalElement.addEventListener('shown.bs.modal', startCamera);
    cameraModalElement.addEventListener('hidden.bs.modal', stopCamera);
    takePhotoButton.addEventListener('click', takePhoto);
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