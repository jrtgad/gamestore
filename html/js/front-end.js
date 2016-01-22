"use strict";

var globals = function (ns) {
    ns.NAME_PATTERN = /^[a-zñ\-\'\.]+(?:\s[a-zñ\-\'\.]+)+$/i;
    ns.MAIL_PATTERN = /^[\w.]+@[\w.]+\.[\w]{2,6}$/i;
    ns.PASS_PATTERN = /^.*(?=.{6,})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    ns.URL_PATTERN = /^(http:\/\/|https:\/\/|www.|ftp:\/\/).+[a-z]{2,4}$/i;
    ns.COUNTRIES = [
        "Alemania", "Bélgica", "Dinamarca", "España", "Francia", "Grecia", "Holanda", "Italia", "Suecia", "Reino Unido"
    ];
    ns.INPUTS = ["userName", "userMail", "pass", "passConfirmation", "checkbox"];
    ns.ERROR = "Rellene correctamente los campos";
    ns.validatePattern = function (pattern, input) {
        if (input.value.length === 0) {
            globals.requiredClass(input, "reset");
        } else {
            if (pattern.test(input.value)) {
                globals.requiredClass(input, "valid");
            } else {
                globals.requiredClass(input, "invalid");
            }
        }
    };

    /** Si el obj tenia clase required, la respeta */
    ns.requiredClass = function (input, setClass) {
        if (input.className.match("(\\s|^)required(\\s|$)")) {
            input.className = "required " + setClass;
        } else {
            input.className = setClass;
        }
    };
    ns.validate = function () {
        if (!!globals.INPUTS.every(function (element) {
            return $(element).className.match("(\\s|^)valid(\\s|$)");
        })) {
            var p = document.createElement("p");
            p.id = "guardado",
            p.className = "modalWindow";
            p.innerHTML = "Su información ha sido guardada";
            document.forms[1].submit();
            //$("login").appendChild(p);

        } else {
            if ($("error")) {
                $("registro").removeChild($("error"));
            }
            var p = document.createElement("p");
            p.id = "error",
            p.className = "modalWindow";
            p.innerHTML = globals.ERROR;
            $("registro").appendChild(p);
        }
    }
    return ns;
}({});

function $(id) {
    return document.getElementById(id);
}

function validateName() {
    globals.validatePattern(globals.NAME_PATTERN, $("userName"));
}

function validateMail() {
    globals.validatePattern(globals.MAIL_PATTERN, $("userMail"));
}

function validatePass() {
    globals.validatePattern(globals.PASS_PATTERN, $("pass"));
}

function validateURL() {
    globals.validatePattern(globals.URL_PATTERN, $("url"));
}

function confirmPass() {
    if ($("passConfirmation").value === "" || $("pass").value === "") {
        $("passConfirmation").className = "required reset";
    } else {
        if ($("pass").value !== $("passConfirmation").value) {
            $("passConfirmation").className = "invalid required";
        } else {
            $("passConfirmation").className = "valid required ";
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

    if ($("country").value === "es") {
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
    if ($("siteConditioglobals").unchecked) {
        $("siteConditioglobals").className = "invalid";
    } else {
        $("siteConditioglobals").className = "valid";
    }
}

function validatePostalCode() {
    var pattern = new RegExp("^52[0-9]{3}$");
    validatePattern(pattern, $("postalCode"));
}

function appendSelectCountry() {
    globals.COUNTRIES.forEach(function (x) {
        var option = document.createElement("option");
        option.innerHTML = x;
        option.value = x.substring(0, 2).toLowerCase();
        $("country").appendChild(option);
    });
}

function checkEnabled() {
    $("checkbox").checked ? $("checkbox").className = "valid" : $("checkbox").className = "invalid";
}

function addEvents() {
    appendSelectCountry();
    $("userName").addEventListener("keyup", validateName, false);
    $("userMail").addEventListener("keyup", validateMail, false);
    $("country").addEventListener("change", checkCountry, false);
    $("pass").addEventListener("keyup", validatePass, false);
    $("url").addEventListener("keyup", validateURL, false);
    $("passConfirmation").addEventListener("keyup", confirmPass, false);
    $("checkbox").addEventListener("change", checkEnabled, false);
    $("send").addEventListener("click", globals.validate, false);
}

window.onload = addEvents;