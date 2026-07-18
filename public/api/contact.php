<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body']);
    exit;
}

$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$phone   = trim($input['phone'] ?? '');
$service = trim($input['service'] ?? '');
$message = trim($input['message'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $service === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$to = 'info@gl-fm.de';
$subject = 'Neue Anfrage – ' . $name;

$body  = "Neue Anfrage über das Kontaktformular\n";
$body .= "==========================================\n\n";
$body .= "Name:      " . $name . "\n";
$body .= "E-Mail:    " . $email . "\n";
$body .= "Telefon:   " . $phone . "\n";
$body .= "Service:   " . $service . "\n\n";

if ($message !== '') {
    $body .= "Nachricht:\n" . $message . "\n\n";
}

$body .= "------------------------------------------\n";
$body .= "Gesendet von: golden-line-fm.de\n";
$body .= "Datum: " . date('d.m.Y H:i:s') . "\n";

$headers  = "From: no-reply@gl-fm.de\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: GLFM-Website/1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Please try again or call us.']);
}
