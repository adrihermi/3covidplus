<?php 
    $_SESSION = array();
    session_destroy();
    $_SESSION["usuario"] ="";
	$_SESSION["contraseña"] = "";
    return true;
?>