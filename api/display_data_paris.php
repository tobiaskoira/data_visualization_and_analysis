<?php
// This Enable CORS to allow requests from localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your React app's URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow headers
header("Content-Type: application/json; charset=UTF-8"); // Set content type to JSON
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../config/database.php';
include 'getNatureOptions.php';    // Include function to fetch nature options
include 'getMarketData.php'; 



// Initialize the response array
$response = [
    "natureOptions" => getNatureOptions($mysqli),
    "data" => getMarketData($mysqli)  
];


// Encode the $markets array to JSON with options to handle special characters
$encoded_data = json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR);

// Check for JSON encoding errors
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON Encoding Error: " . json_last_error_msg();
    exit;
}

// Output the JSON data
echo $encoded_data;

// Close the database connection
$mysqli->close();
?>



