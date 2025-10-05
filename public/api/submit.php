<?php
header('Content-Type: application/json');

// Baca body JSON
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "No data received"]);
  exit;
}

$url = "https://script.google.com/macros/s/AKfycbyzHyxiAjyciIyQp0cOPBNKOzvn_9W5JKjpcEQixqwMQ09eyM7YGCmO_neAaWBAIHIh/exec";

$options = [
  "http" => [
    "header"  => "Content-Type: application/json\r\n",
    "method"  => "POST",
    "content" => json_encode($data),
  ],
];
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => "Gagal mengirim ke Google Script"]);
  exit;
}

echo $result;
