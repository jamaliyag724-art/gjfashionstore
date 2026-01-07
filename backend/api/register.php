<?php

header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

if (!$name || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email"]);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

try {
    $query = $conn->prepare(
        "INSERT INTO users (name, email, password_hash) 
         VALUES (:name, :email, :password)"
    );

    $query->execute([
        ":name" => $name,
        ":email" => $email,
        ":password" => $passwordHash
    ]);

    echo json_encode(["success" => true, "message" => "Account created successfully"]);
}
catch (PDOException $e) {

    // duplicate email
    if ($e->getCode() == 23000) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
    } 
    else {
        echo json_encode(["success" => false, "message" => "Registration failed"]);
    }
}
?>

