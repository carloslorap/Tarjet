/// cardholder name

let nameCard = document.querySelector('.card_details-name');
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form_cardholder--error');



//number card

let numberCard = document.querySelector('.card_number');
let numberInput = document.querySelector('#cardNumber');
let numberErrorDiv = document.querySelector('.form_inputnumber--error');


// MM card


let mothCard = document.querySelector('.card_month');
let mothInput = document.querySelector('#cardMonth');
let mothErrorDiv = document.querySelector('.form_input-mm--error');

// YY card
let yearCard = document.querySelector('.card_year');
let yearInput = document.querySelector('#cardYear');
let yearCardErrorDiv = document.querySelector('.form_input-yy--error');

// CVC card

let cvcCard = document.querySelector('.card-back_cvc');
let cvcInput = document.querySelector('#cardCvc');
let cvcErrorDiv = document.querySelector('.form_input-cvc--error');

// boton de confirmacion
let confirmBTN = document.querySelector('.form_submit');

//validancion de todo los input

let nameValidation = false;
let numberValidation = false;
let mothValidation = false;
let yearValidation = false;
let cvcValidation = false;


// secciones form y thanks
let formSection= document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');




// ingreso dinamico del nombre
nameInput.addEventListener('input', () => {
    if (nameInput.value == '') {
        nameCard.innerText = 'Jane Appleseed';
    } else { nameCard.innerText = nameInput.value; }

})

// ingreso dinamico del numero
numberInput.addEventListener('input', event => {
    let inputValue = event.target.value;
    //actualizando graficamente la tarjeta
    numberCard.innerText = numberInput.value;

    //validando que haya una letra 
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value)) {
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only');

    } else {
        //agregando espacio cada 4 digito,borrando espacios ingresado por el usuario,y borrando el espacio final
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        hideError(numberInput, numberErrorDiv);

    }

    //mostrando los 0 por defecto cuando no se  ha ingresado nada
    if (numberInput.value == '') {
        numberCard.innerText = '0000 0000 0000 0000';
    }

});


//ingreso dinamico del mes

mothInput.addEventListener('input', () => {
    mothCard.innerText = mothInput.value;
    validateletter(mothInput, mothErrorDiv);
});


// ingreso dinamico del año

yearInput.addEventListener('input', () => {
    yearCard.innerText = yearInput.value;
    validateletter(yearInput, yearCardErrorDiv);
});
//ingreso dinamico del cvc
cvcInput.addEventListener('input', () => {
    cvcCard.innerText = cvcInput.value;
    validateletter(cvcInput, cvcErrorDiv);
}
);

///
function showError(divInput, divError, msgError) {
    divError.innerText = msgError;
    divInput.style.borderColor = '#FF0000';
}

function hideError(divInput, divError) {
    divError.innerText = '';
    divInput.style.borderColor = 'hsl(270, 3%, 87%)';
}






confirmBTN.addEventListener('click', event => {
    event.preventDefault();

    //validar nombre
    if (verifyIsFilled(nameInput, nameErrorDiv)) {
        nameValidation = true;
    }else{
        nameValidation = false;
    }

    //validar number
    verifyIsFilled(numberInput, numberErrorDiv);

    if (verifyIsFilled(numberInput, numberErrorDiv) == true) {
        if (numberInput.value.length == 19) {
            hideError(numberInput, numberErrorDiv, '');
            numberValidation = true;
        } else {
            showError(numberInput, numberErrorDiv, 'Wrong Number');
            numberValidation= false;
        }

    }


    //validar mes

    verifyIsFilled(mothInput, mothErrorDiv);

    console.log(parseInt(mothInput.value));
    if (parseInt(mothInput.value) > 0 && parseInt(mothInput.value) <= 12) {
        hideError(mothInput, mothErrorDiv, '');
        mothValidation = true;

    } else {
        showError(mothInput, mothErrorDiv, 'Wrong Month');
        mothValidation=false;
    }

    //validar año

    if (verifyIsFilled(yearInput, yearCardErrorDiv)) {
        if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27) {
            yearValidation = true;

        } else {
            showError(yearInput, yearCardErrorDiv, 'Wrong Year ');
            yearValidation= false;
        }

    }


    //validar cvc
    if (verifyIsFilled(cvcInput, cvcErrorDiv)) {
        if (cvcInput.value.length == 3) {
            hideError(cvcInput, cvcErrorDiv, '');
            cvcValidation = true;
        } else {
            showError(cvcInput, cvcErrorDiv, 'Wrong CVC');
            cvcValidation= false;
        }
    }

    // cambio de pantalla
    if(nameValidation==true&&numberValidation==true&&mothValidation==true&&yearValidation==true&&cvcValidation==true){
        formSection.style.display='none';
        thanksSection.style.display = 'block';
    }


});

function verifyIsFilled(divInput, divError) {

    if (divInput.value.length > 0) {
        hideError(divInput, divError, '');
        return true;

    } else {
        showError(divInput, divError, "Cant't be blank")
        return false;
    }
}

// validando de q no haiga letras en los input
function validateletter(input, divError) {

    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
        showError(input, divError, 'Wrong format, numbers only');
    } else {
        hideError(input, divError, '');
    }

};


