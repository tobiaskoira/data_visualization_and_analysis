
<?php
include '../config/database.php'; // Include the database connection

function getMarketData($mysqli) {
    $sql = "SELECT * FROM markets WHERE 1=1";
    if (isset($_GET['nature'])) {
        $natures = explode(',', $_GET['nature']);
        $nature_filter = "'" . implode("','", array_map([$mysqli, 'real_escape_string'], $natures)) . "'";
        $sql .= " AND nature_du_marche IN ($nature_filter)";
    }

     
    if (isset($_GET['annee'])) {
        $year = $mysqli->real_escape_string($_GET['annee']);
        $sql .= " AND annee_de_notification = '$year'";
    }
    if (isset($_GET['numero_marche'])) {
        $numero_marche = $mysqli->real_escape_string($_GET['numero_marche']);
        $sql .= " AND numero_marche LIKE '%$numero_marche%'";
    }
    if (isset($_GET['categorie_d_achat_cle'])) {
        $categorie_d_achat_cle = $mysqli->real_escape_string($_GET['categorie_d_achat_cle']);
        $sql .= " AND categorie_d_achat_cle LIKE '%$categorie_d_achat_cle%'";
    }
    if (isset($_GET['fournisseur_nom'])) {
        $fournisseur_nom = $mysqli->real_escape_string($_GET['fournisseur_nom']);
        $sql .= " AND fournisseur_nom LIKE '%$fournisseur_nom%'";
    }
    if (isset($_GET['categorie_d_achat_texte'])) {
        $categorie_d_achat_texte = $mysqli->real_escape_string($_GET['categorie_d_achat_texte']);
        $sql .= " AND categorie_d_achat_texte LIKE '%$categorie_d_achat_texte%'";
    }
        // Montant Min and Max filter
    if (isset($_GET['montant_min'])) {
        $montant_min = (int)$_GET['montant_min'];
        $sql .= " AND montant_min >= $montant_min";
    }
    if (isset($_GET['montant_max'])) {
        $montant_max = (int)$_GET['montant_max'];
        $sql .= " AND montant_max <= $montant_max";
    }

    if (isset($_GET['duree_du_marche_min'])) {
        $duree_du_marche = (int)$_GET['duree_du_marche_min'];
        $sql .= " AND duree_du_marche >= $duree_du_marche";
    }
    
    if (isset($_GET['duree_du_marche_max'])) {
        $duree_du_marche = (int)$_GET['duree_du_marche_max'];
        $sql .= " AND duree_du_marche <= $duree_du_marche";
    }
    if (isset($_GET['start_date'])) {
        $start_date = $mysqli->real_escape_string($_GET['start_date']);
        $sql .= " AND date_de_debut >= '$start_date'";
    }
    if (isset($_GET['end_date'])) {
        $end_date = $mysqli->real_escape_string($_GET['end_date']);
        $sql .= " AND date_de_fin <= '$end_date'";
    }

    $limit = isset($_GET['limit']) ? $_GET['limit'] : '100';
    if ($limit === 'all') {
        $sql .= "";
    } elseif ($limit === '50') {
        $sql .= " LIMIT 50";
    } 
    elseif ($limit === '5') {
        $sql .= " LIMIT 5";
    } 
    elseif ($limit === '10') {
        $sql .= " LIMIT 10";
    } 
    elseif ($limit === '25') {
        $sql .= " LIMIT 25";
    } 
    else {
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

// Function to get the total count of rows that match the filters (without pagination)
function getTotalCount($mysqli) {
    $sql = "SELECT COUNT(*) AS totalCount FROM markets WHERE 1=1";
    if (isset($_GET['nature'])) {
        $natures = explode(',', $_GET['nature']);
        $nature_filter = "'" . implode("','", array_map([$mysqli, 'real_escape_string'], $natures)) . "'";
        $sql .= " AND nature_du_marche IN ($nature_filter)";
    }

    if (isset($_GET['annee'])) {
        $year = $mysqli->real_escape_string($_GET['annee']);
        $sql .= " AND annee_de_notification = '$year'";
    }

    if (isset($_GET['numero_marche'])) {
        $numero_marche = $mysqli->real_escape_string($_GET['numero_marche']);
        $sql .= " AND numero_marche LIKE '%$numero_marche%'";

    }
        if (isset($_GET['categorie_d_achat_cle'])) {
        $categorie_d_achat_cle = $mysqli->real_escape_string($_GET['categorie_d_achat_cle']);
        $sql .= " AND categorie_d_achat_cle LIKE '%$categorie_d_achat_cle%'";
    }

    if (isset($_GET['categorie_d_achat_texte'])) {
        $categorie_d_achat_texte = $mysqli->real_escape_string($_GET['categorie_d_achat_texte']);
        $sql .= " AND categorie_d_achat_texte LIKE '%$categorie_d_achat_texte%'";
    }
    if (isset($_GET['fournisseur_nom'])) {
        $fournisseur_nom = $mysqli->real_escape_string($_GET['fournisseur_nom']);
        $sql .= " AND fournisseur_nom LIKE '%$fournisseur_nom%'";
    }

        // Montant Min and Max filter
    if (isset($_GET['montant_min'])) {
        $montant_min = (int)$_GET['montant_min'];
        $sql .= " AND montant_min >= $montant_min";
    }
    if (isset($_GET['montant_max'])) {
        $montant_max = (int)$_GET['montant_max'];
        $sql .= " AND montant_max <= $montant_max";
    }

    if (isset($_GET['duree_du_marche'])) {
        $duree_du_marche = (int)$_GET['duree_du_marche'];
        $sql .= " AND duree_du_marche <= $duree_du_marche";
    }
    if (isset($_GET['start_date'])) {
        $start_date = $mysqli->real_escape_string($_GET['start_date']);
        $sql .= " AND date_de_debut >= '$start_date'";
    }
    if (isset($_GET['end_date'])) {
        $end_date = $mysqli->real_escape_string($_GET['end_date']);
        $sql .= " AND date_de_fin <= '$end_date'";
    }

    $result = $mysqli->query($sql);
    if ($result) {
        $row = $result->fetch_assoc();
        return (int)$row['totalCount'];
    } else {
        die("Error fetching total count: " . $mysqli->error);
    }
}
$response = [
    "data" => getMarketData($mysqli),
     "totalCount" => getTotalCount($mysqli) 
];
//echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR);

