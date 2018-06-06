<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.tdweb.pt';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'contactos@tdweb.pt';                 // SMTP username
$mail->Password = '3{kR$#~EPzrE';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

$mail->From = $_POST['senderEmail'];
$mail->FromName = $_POST['senderName'];
$mail->addAddress('contactos@tdweb.pt', 'Contactos');     // Add a recipient
/*$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo('info@example.com', 'Information');
$mail->addCC('cc@example.com');
$mail->addBCC('bcc@example.com');
*/
$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
/*$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML
*/
$mail->Subject = "Contact Form - TDweb";
$mail->Body    = $_POST['comment'];
//$mail->AltBody = $_POST['comment'];

if(isset($_POST['g-recaptcha-response'])){
  	$captcha=$_POST['g-recaptcha-response'];
}

if(!$captcha){
  	header('Location: index.html?e=bot');
  	//echo '<h2>Please check the the captcha form.</h2>';
  	//exit;
}

$secretKey = "6Le9c1YUAAAAAF9AyQeHK7PbGFuDXdjdGd6wiP2q";
$ip = $_SERVER['REMOTE_ADDR'];
$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
$responseKeys = json_decode($response,true);

if(intval($responseKeys["success"]) !== 1) {
  	header('Location: index.html?e=bot');
  	//die();
} else {
	if(!$mail->send()) {
	    header('Location: index.html?e=error');
	    	//.trim($mail->ErrorInfo," ")
	    //die();
	} else {
	    header('Location: index.html?e=success');
	}
}
