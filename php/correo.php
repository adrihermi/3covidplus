﻿<?php
use PHPMailer\PHPMailer\PHPMailer;
require dirname(__FILE__)."/../vendor/autoload.php";
function enviar_correos($correo){
	$cuerpo = crear_correo();
	return enviar_correo_multiples("$correo, ies.aller.ulloa@edu.xunta.es", 
                        	$cuerpo, "Aviso de contacto con un positivo en covid-19.");
}
function crear_correo(){
	$texto = "<h1>Contacto con positivo en covid-19.</h1>´
			  <p>Nos ponemos en contacto con usted para comunicarle que su hijo
			  a estado en contacto con un positivo en covid-19. Por favor mantenganse 
			  en cuarentena domiciliara durante un mínimo de 15 días.</p>
			  <p>Si presenta síntomas pongase en contacto con su médico de cabecera.</p>
			  <p>Dirección del IES Ramón María Aller Ulloa</p>";	
	return $texto;
}
function enviar_correo_multiples($lista_correos,  $cuerpo,  $asunto = ""){
		$mail = new PHPMailer();		
		$mail->IsSMTP(); 					
		$mail->SMTPDebug  = 0;
		$mail->SMTPAuth   = true;                  
		//$mail->SMTPSecure = "tls";                 
		$mail->Host       = "smtp.gmail.com";      
		$mail->Port       = 587;                   
		$mail->Username   = "ies_aller_ulloa@gmail.com";  //usuario de gmail
		$mail->Password   = ""; //contraseña de gmail          
		$mail->SetFrom('ies.aller.ulloa@edu.xunta.es', 'Aviso de contacto con un positivo en covid-19.');
		$mail->Subject    = $asunto;
		$mail->MsgHTML($cuerpo);
		foreach($lista_correos as $correo){
			$mail->AddAddress($correo, $correo);
		}
		if(!$mail->Send()) {
		  return $mail->ErrorInfo;
		} else {
		  return TRUE;
		}
	}	