<?php

/* for TEST disable cors
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Headers: origin, x-requested-with, content-type");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
*/

$data = file_get_contents('php://input');
$data = json_decode($data);

echo json_encode([
    'status' => true,
    'data' => $data,
    'get' => $_GET,
    'method' => $_SERVER['REQUEST_METHOD']
]);