<?php
include '../config/database.php';


function getYears($mysqli){

    $years = [];
    $sql = "SELECT DISTINCT annee_de_notification FROM markets ORDER BY annee_de_notification DESC";
    $result = $mysqli->query($sql);

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $years[] = $row['annee_de_notification'];
        }
    } else {
        die("Error fetching years: " . $mysqli->error);
    }
    return $years;
}
?>