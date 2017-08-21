<?php
/*
Name: 			Contact Form
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	5.7.1
*/

session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

require_once('PHPMailerAutoload.php');

// Step 1 - Enter your email address below.
$email = 'geral@tdweb.pt';

// If the e-mail is not working, change the debug option to 2 | $debug = 2;
$debug = 2;

$subject = "TDweb: ".$_POST['subject'];

$fields = array(
	0 => array(
		'text' => 'Nome',
		'val' => $_POST['senderName']
	),
	1 => array(
		'text' => 'Email',
		'val' => $_POST['senderEmail']
	),
	2 => array(
		'text' => 'Endereço IP',
		'val' => $_SERVER['REMOTE_ADDR']
	),
	3 => array(
		'text' => 'Mensagem',
		'val' => $_POST['comment']
	)
);

$message = '';

foreach($fields as $field) {
	$message .= $field['text'].": " . htmlspecialchars($field['val'], ENT_QUOTES) . "<br>\n";
}

$mail = new PHPMailer(true);

try {

	$mail->SMTPDebug = $debug;                                 // Debug Mode

	// Step 2 (Optional) - If you don't receive the email, try to configure the parameters below:

	$mail->IsSMTP();                                         // Set mailer to use SMTP
	$mail->Host = 'mail.tdweb.pt';				       // Specify main and backup server
	$mail->SMTPAuth = true;                                  // Enable SMTP authentication
	$mail->Username = 'geral@tdweb.pt';                    // SMTP username
	$mail->Password = 'Messias95!';                              // SMTP password
	$mail->SMTPSecure = 'ssl';                               // Enable encryption, 'ssl' also accepted
	$mail->Port = 465;   								       // TCP port to connect to

	$mail->AddAddress($email);	 						       // Add another recipient

	//$mail->AddAddress('person2@domain.com', 'Person 2');     // Add a secondary recipient
	//$mail->AddCC('person3@domain.com', 'Person 3');          // Add a "Cc" address. 
	//$mail->AddBCC('person4@domain.com', 'Person 4');         // Add a "Bcc" address. 

	$mail->SetFrom($email, 'TDweb');
	//$mail->AddReplyTo($_POST['senderEmail'], $_POST['senderName']);

	$mail->IsHTML(true);                                  // Set email format to HTML

	$mail->CharSet = 'UTF-8';

	$mail->Subject = $subject;
	$mail->Body    = $message;

	$mail->Send();
	$arrResult = array ('response'=>'success');

	header('Location: index.html?msg=1');

} catch (phpmailerException $e) {
	$arrResult = array ('response'=>'error','errorMessage'=>$e->errorMessage());
} catch (Exception $e) {
	$arrResult = array ('response'=>'error','errorMessage'=>$e->getMessage());
}

if ($debug == 0) {
	echo json_encode($arrResult);
}
