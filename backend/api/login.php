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

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Email & password required"]);
    exit;
}

$query = $conn->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
$query->execute([":email" => $email]);
$user = $query->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user["password_hash"])) {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id" => $user["id"],
        "name" => $user["name"],
        "email" => $user["email"]
    ]
]);
?>

