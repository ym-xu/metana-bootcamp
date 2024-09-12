function handleUserForm() {
    const form = document.getElementById("myForm");

    var formData = new FormData(form);

    var formObject = {};
    formData.forEach(function(value, key) {
        formObject[key] = value;
    });

    console.log("Form data:", formObject);

}

document.getElementById("myForm").onsubmit = handleUserForm;


function validateForm(event) {
    event.preventDefault();

    var form = event.target;

    var errorMessage = "";

    var emailInput = form.elements["email"].value.trim();
    if (emailInput === "") {
        errorMessage += "Email is required.\n";
    } else if (!isValidEmail(emailInput)) {
        errorMessage += "Invalid email format.\n";
    }

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    var errorContainer = document.getElementById("errorContainer");
    if (errorMessage !== "") {
        errorContainer.textContent = errorMessage;
    } else {
        // If no errors, submit the form
        form.submit();
    }


}

document.getElementById("myForm").onsubmit = validateForm;