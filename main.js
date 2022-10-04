/* CARDHOLDER NAME */
let nameCard = document.querySelector(".card__details-name");
let nameInput = document.querySelector("#cardholder");
let nameErrorDiv = document.querySelector(".form__cardholder-error");

//CARD NUMBER
let numberCard = document.querySelector(".card__number");
let numberInput = document.querySelector("#cardNumber");
let numberErrorDiv = document.querySelector('.form__inputnumber--error');

//CARD MONTH
let monthCard = document.querySelector(".card__month");
let monthInput = document.querySelector("#cardMonth");
let monthError = document.querySelector('.form__input-mm--error');

//CARD YEAR
let yearCard = document.querySelector(".card__year");
let yearInput = document.querySelector("#cardYear");
let yearError = document.querySelector('.form__input-yy--error');

//CARD CVC
let cvcCard = document.querySelector(".card-back__cvc");
let cvcInput = document.querySelector("#cardCvc");
let cvcError = document.querySelector('.form__input-cvc--error');

//Ingreso dinamico del nombre
nameInput.addEventListener("input", ()=>{
    if (nameInput.value == ''){
        nameCard.innerText = 'JANE APPLESEED';
    }else{
        nameCard.innerText = nameInput.value;
    }
});

//Ingreso dinamico del numero de tarjeta
numberInput.addEventListener("input", e => {
    let inputValue = e.target.value;

   //validando card number solo numeros salto cada 4 numeros el campo lleno
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value)){
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only')
    }else{
        numberInput.value = inputValue.replace(/\s/g , "").replace(/([0-9]{4})/g, '$1 ').trim();//ponemos un espacio cada 4 numeros, el metodo trim elimina el espacio del final
        hiddeError(numberInput, numberErrorDiv);
    }
    if (numberInput.value == ''){
        numberCard.innerText = '0000 0000 0000 0000';
    }else{
        numberCard.innerText = numberInput.value;
    }
   
});

//Ingreso dinamico del mes
monthInput.addEventListener('input', () => {
    monthCard.innerText = monthInput.value;
});

//Ingreso dinamico del año
yearInput.addEventListener('input', ()=>{
    yearCard.innerText = yearInput.value;
});

//Ingreso dinamico del cvc
cvcInput.addEventListener('input', ()=>{
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcError);
});


//Boton confirm
let confirmBtn = document.querySelector('.form__submit');

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

//section formulario y thanks 
let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmBtn.addEventListener('click', e =>{
    e.preventDefault();

    //Validar Name
    if(verifyIsDilled(nameInput, nameErrorDiv)){
        nameValidation = true;
    }else{
        nameValidation = false;
    }

    //Validar Numero
    if(verifyIsDilled(numberInput, numberErrorDiv) == true) {
        if(numberInput.value.length == 19){
            hiddeError(numberInput, numberErrorDiv);
            numberValidation = true;
        }else{
            showError(numberInput, numberErrorDiv, 'Wrong number');
            numberValidation = false;
        }
    }

    //Validar mes
    verifyIsDilled(monthInput, monthError);
    if(monthInput.value > 0 && monthInput.value <= 12){
        monthCard.innerText = monthInput.value;
        hiddeError(monthInput, monthError);
        monthValidation = true;

    }else{
        showError(monthInput, monthError, "Can't be blak");
        monthValidation = false;
    }

    //Validar año
    if(verifyIsDilled(yearInput, yearError)){
        if(parseInt(yearInput.value) > 21 && parseInt(yearInput.value) < 28){
            hiddeError(numberInput, numberErrorDiv);
            yearValidation = true;
        }else{
            showError(yearInput, yearError, 'Wrong Year');
            yearValidation = false;
        }
    }

    //Validar cvc
    if(verifyIsDilled(cvcInput, cvcError)){
        if(cvcInput.value.length == 3){
            hiddeError(cvcInput, cvcError);
            cvcValidation = true;
        }else{
            showError(cvcInput, cvcError, 'Wrong cvc');
            cvcValidation = false;
        }
    }

    if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true){
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }
});


//functions

function showError(inputError, divError, msgError){
    divError.innerText = msgError;
    inputError.style.borderColor = '#FF0000';
}

function hiddeError(inputError, divError){
    divError.innerText = '';
    inputError.style.borderColor = 'hsl(270, 3%, 87%)';
}

function verifyIsDilled(divInput, divError){
    if(divInput.value.length > 0){
        hiddeError(divInput, divError);
        return true;
    }else{
        showError(divInput, divError, "Can't be blank");
        return false;
    }
}

 //validando si hay una letra, borrando espacios ingresados por el usuario, agregando espacios cada cuatro numeros
function validateLetters(input, error){
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)){
        showError(input, error, 'Wrong format, numbers only')
    }else{
        hiddeError(input, error);
    }
}



