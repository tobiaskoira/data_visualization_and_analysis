
<?php
include '../config/database.php'; // Include the database connection

function getMarketData($mysqli) {
    $sql = "SELECT * FROM markets WHERE 1=1";
    if (isset($_GET['nature'])) {
        $natures = explode(',', $_GET['nature']);
        $nature_filter = "'" . implode("','", array_map([$mysqli, 'real_escape_string'], $natures)) . "'";
        $sql .= " AND nature_du_marche IN ($nature_filter)";
    }
    $limit = isset($_GET['limit']) ? $_GET['limit'] : '100';
    if ($limit === 'all') {
        $sql .= "";
    } elseif ($limit === '50') {
        $sql .= " LIMIT 50";
    } else {
        $sql .= " LIMIT 100";
    }
    
    $result = $mysqli->query($sql);
    $markets = [];
    if ($result) {
        while ($market = $result->fetch_assoc()) {
            $markets[] = $market;
        }
    } else {
        die("Error fetching market data: " . $mysqli->error);
    }
    return $markets;
}

$response = [
    "data" => getMarketData($mysqli)
];
//echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR);

