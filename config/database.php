<?php 
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

?>