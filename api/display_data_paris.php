<?php
// This Enable CORS to allow requests from localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your React app's URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow headers
header("Content-Type: application/json; charset=UTF-8"); // Set content type to JSON
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "dina";
$database = "france";

// Create a MySQLi connection
$mysqli = new mysqli($servername, $username, $password, $database);

// Check if the connection was successful
if ($mysqli->connect_errno != 0) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Set the character set to UTF-8
$mysqli->set_charset("utf8");

// Initialize the $markets array
$markets = [];

// Execute the SQL query
$sql = "SELECT * FROM markets";
$result = $mysqli->query($sql);

// Check if the query returned results
if (!$result) {
    die("Query failed: " . $mysqli->error); // Show the error if the query fails
}

// Debug: Check the number of rows returned
//echo "Rows found: " . $result->num_rows . "<br>";

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Fetch each row and add it to the $markets array
    while ($market = $result->fetch_assoc()) {
        // Convert each field to UTF-8 to ensure proper encoding
        $market = array_map(function($value) {
            // Only apply encoding if $value is not null or empty
            if (!is_null($value) && $value !== '') {
                return mb_detect_encoding($value, 'UTF-8', true) ? $value : mb_convert_encoding($value, 'UTF-8');
            }
            return $value; // Return value as-is if null or empty
        }, $market);
        
        $markets[] = $market;
    }
} else {

    echo "No data found in the 'markets' table.";
    exit;
}

// Encode the $markets array to JSON with options to handle special characters
$encoded_data = json_encode($markets, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR);

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



