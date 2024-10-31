<?php
// Enable CORS and JSON output
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Include the database connection
include '../config/database.php';

// Define the function to get nature options
function getNatureOptions($mysqli) {
    $natureOptions = [];
    $sql = "SELECT DISTINCT nature_du_marche FROM markets";
    $result = $mysqli->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $natureOptions[] = $row['nature_du_marche'];
        }
    } else {
        die("Error fetching nature options: " . $mysqli->error);
    }
    return $natureOptions;
}

// Call the function and output the response as JSON
$response = [
    "natureOptions" => getNatureOptions($mysqli)
];

// Encode the response and output it
//echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR);

// Close the database connection

?>

