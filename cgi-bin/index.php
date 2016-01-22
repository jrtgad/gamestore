<?php

    //session_start();

    $_COOKIE[] = setcookie("Cookie", time(), null, "/", null, null, null);

    if (isset($_POST['data'])) {
        $data = $_POST['data'];
        $msg = "Su información ha sido guardada";

        $string = "Usuario: " + $data['userName'] + "\n";
        $string += "E-mail: " + $data['userMail'] + "\n";
        $string += "Contraseña: " + $data['pass'] + "\n";
        $string += "Confirmacion: " + $data['passConfirmation'] + "\n";
        if(isset($data["url"])) {
            $string += "URL: " + $data['url'] + "\n";
        }
        if(isset($data["address"])) {
            $string += "Direccion: " + $data['address'] + "\n";
        }
        if(isset($data["country"])) {
            $string += "Pais: " + $data['country'] + "\n";
        }
        if(isset($data["postalCode"])) {
            $string += "Codigo postal: " + $data['postalCode'] + "\n";
        }
        $fp = fopen(+'.txt', 'w');
        fwrite($fp, $string);
        fclose($fp);

        include '../html/index.html';
    } else {
        if(isset($_POST["registro"])) {
            include '../html/registro.html';
        } else {
            $msg = "Usuario registrado";
            include '../html/index.html';
        }
    }
?>