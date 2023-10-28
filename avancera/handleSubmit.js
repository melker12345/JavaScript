const form = document.getElementById("form");
const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("name");
const consentCheckbox = document.getElementById("consent");
const nameError = document.getElementById("name-error");
const consentError = document.getElementById("consent-error");
const errorsDiv = document.getElementById("errors");
const sendButton = document.getElementById('send');

// i need to have a button disable by default and only turn the button to enabled once nameInput.value == true and consentCheckbox.checked

function initialize() {
    
    if (nameInput.value) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
    }

    if (consentCheckbox.checked) {
        consentError.style.display = "none";
    } else {
        consentError.style.display = "block";
    }

    if (nameInput.value && consentCheckbox.checked) {
        errorsDiv.style.display = "none";
        sendButton.disabled = false; 
    } else {
        errorsDiv.style.display = "block";
        sendButton.disabled = true;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    if (nameInput.value && consentCheckbox.checked) {
        greeting.textContent = `Hej ${nameInput.value}!`;
    }
}

// When submit event call handleSubmit func
form.addEventListener("submit", handleSubmit);

nameInput.addEventListener("input", initialize);
consentCheckbox.addEventListener("change", initialize);

window.onload = initialize;
