var nameError = document.getElementById("name-error");
var emailError = document.getElementById("email-error");
var phoneError = document.getElementById("phone-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");
// let contactName = document.getElementById("contact-name");
// function notEmpty() {
//     if (contactName.value.length == 0) {
//         nameError.innerHTML = "you must write a value";
//     }
// }

function validateName() {
    var nameValue = document.getElementById("contact-name").value;
    if (nameValue.length == 0) {
        nameError.innerHTML = "Name is required";
        return false;
    }
    if (!nameValue.match(/^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/)) {
        nameError.innerHTML = "write full name";
        return false
    }
    nameError.innerHTML = "<i class='fa-solid fa-circle-check' style='color:green'></i>";
    return true
}
function validatePhoneNumber() {
    var PhoneValue = document.getElementById("contact-phone").value;
    if (PhoneValue.length !== 12) {
        phoneError.innerHTML = "phone number should be 10 digits";
        return false;
    }
    if (!PhoneValue.match(/^\d{3} \d{3} \d{4}$/)) {
        phoneError.innerHTML = "phone number is required";
        return false;
    }
    phoneError.innerHTML = "<i class='fa-solid fa-circle-check' style='color:green'></i>";
    return true;
}

function validateEmail() {
    var emailValue = document.getElementById("contact-email").value;
    if (emailValue.length == 0) {
        emailError.innerHTML = "email is required";
        return false;
    }
    if (!emailValue.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        emailError.innerHTML = "email is required";
        return false;
    }
    emailError.innerHTML = "<i class='fa-solid fa-circle-check' style='color:green'></i>";
    return true;

}

function validateMessage() {
    var messageValue = document.getElementById("contact-message").value;
    var required = 30;
    var left = required - messageValue.length
    if (left > 0) {
        messageError.innerHTML = left + " more characters required"
        return false
    }
    messageError.innerHTML = "<i class='fa-solid fa-circle-check' style='color:green'></i>";
    return true;


}
function validateForm() {
    // the default behavior of if is running what is inside it when the condition is true
    // so if one of the functions below return false the ! will make it true 
    if (!validateName() || !validateEmail() || !validatePhoneNumber() || !validateMessage()) {
        submitError.style.display = "block";
        submitError.innerHTML = "please fix error to submit ";
        setTimeout(() => {submitError.style.display = "none";}, 3000);
        return false;
    }
}