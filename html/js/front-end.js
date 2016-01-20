function $(id) {
    return document.getElementById(id);
}

function validatePattern(pattern, input) {
    if (input.value.length === 0) {
        input.className = "reset";
    } else {
        if (pattern.test(input.value)) {
            input.className = "green";
        } else {
            input.className = "red";
        }
    }
}

function validateName() {
    var pattern = new RegExp("^[a-z]*.[a-z]*$", "i");
    validatePattern(pattern, $("userName"));
}

function validateMail() {
    var pattern = new RegExp("^[a-z0-9|0-9a-z]+@[a-z0-9|0-9a-z]+\.(com|es|biz|org)+$", "i");
    validatePattern(pattern, $("userMail"));
}

function validatePass() {
    var pattern =
        new RegExp("^[a-zA-Z0-9.]+{6,13}$");
    validatePattern(pattern, $("pass"));
}

function confirmPass() {
    if ($("passConfirmation").value === "" || $("pass").value === "") {
        $("passConfirmation").className = "reset";
    } else {
        if ($("pass").value !== $("passConfirmation").value) {
            $("passConfirmation").className = "red";
        } else {
            $("passConfirmation").className = "green";
        }
    }
}

function checkCountry() {
    var cp = document.createElement("input"),
        li = document.createElement("li");

    cp.type = "text";
    cp.id = "postalCode";
    cp.name = "postalCode";
    li.appendChild(document.createTextNode("Código Postal"));

    if ($("country").value === "spa") {
        $("titlesForm").appendChild(li);
        $("inputsForm").appendChild(cp);
        $("postalCode").addEventListener("keyup", validatePostalCode, false);
    } else {
        if ($("postalCode") !== undefined) {
            $("inputsForm").removeChild($("postalCode"));
            $("titlesForm").removeChild($("titlesForm").lastChild);
        }
    }
}

function getCheckState() {
    if ($("siteConditions").unchecked) {
        $("siteConditions").className = "red";
    } else {
        $("siteConditions").className = "green";
    }
}

function validatePostalCode() {
    var pattern = new RegExp("^52[0-9]{3}$");
    validatePattern(pattern, $("postalCode"));
}

function addEvents() {
    $("userName").addEventListener("keyup", validateName, false);
    $("userMail").addEventListener("keyup", validateMail, false);
    $("country").addEventListener("change", checkCountry, false);
    $("pass").addEventListener("keyup", validatePass, false);
    $("passConfirmation").addEventListener("keyup", confirmPass, false);
    //$("siteConditions").addEventListener("change", getCheckState, false);
}

window.onload = addEvents;