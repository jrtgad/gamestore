<?php

    //session_start();

    $_COOKIE[] = setcookie("Cookie", time(), null, "/", null, null, null);

    if (isset($_POST['data'])) {
        $data = $_POST['data'];
        $msg = "Su información ha sido guardada";

        $string = "Usuario: " . $data['userName'] . "\n";
        $string .= "E-mail: " . $data['userMail'] . "\n";
        $string .= "Contraseña: " . sha1($data['pass']) . "\n";
        $string .= "URL: " . $data['url'] . "\n";
        $string .= "Direccion: " . $data['address'] . "\n";
        $string .= "Pais: " . $data['country'] . "\n";
        $string .= "Codigo postal: " . $data['postalCode'] . "\n";
        $fp = fopen(str_replace(" ","_",$data['userName']) . time() .'.txt', 'w');
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