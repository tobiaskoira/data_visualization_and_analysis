import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Grid,
  TablePagination,
} from '@mui/material';


import Filters from './Filters';
import './App.css';
import {Charts, TopSuppliersChart} from './Charts';
function App() {
  const [data, setData] = useState([]); // Full data set to display
  const [loading, setLoading] = useState(true);
  const [natureOptions, setNatureOptions] = useState([]); // Unique nature options
  const [natureData, setNatureData] = useState([]);
  const [fundingByCategoryData, setFundingByCaregoryData] = useState([]);
  const [topSuppliersData, setTopSuppliersData] = useState([]);
  const [contractPriceRange, setContractPriceRange] = useState([]);
  const [yearOptions, setYearOptions] = useState([]); // Unique year options
  const [selectedNatures, setSelectedNatures] = useState([]); // Selected nature options
  const [selectedYears, setSelectedYears] = useState([]); // Selected years
  const [numeroMarche, setNumeroMarche] = useState("");
  const [categorie_d_achat_cle, setCategorie_d_achat_cle] = useState("");
  const [categorie_d_achat_texte, setCategorie_d_achat_texte] = useState("");
  const [montantRange, setMontantRange] = useState([0, 1000000]);
  const [fournisseurNom, setfournisseurNom] = useState("");
  const [marcheRange, setMarcheRange] = useState([0, 10000]);
  const [startDate, setStartDate] = useState(""); // State for Date de début
  const [endDate, setEndDate] = useState(""); // State for Date de fin
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination
  const [totalCount, setTotalCount] = useState(0); // Total count of items for pagination
  const [openCheckboxGroups, setOpenCheckboxGroups] = useState([false, false, false, false, false, false, false, false, false]);

  const clearFilters = () => {
    setSelectedNatures([]);
    setSelectedYears([]);
    setNumeroMarche("");
    setfournisseurNom("");
    setMontantRange([0, 1000000]);
    setMarcheRange([0, 10000]);
    setStartDate("");
    setEndDate("");
    fetchData(); // Optionally re-fetch data with cleared filters
  };



  // Function to fetch data from the server
  const fetchData = () => {
    const params = new URLSearchParams();

    // Add selected filters to params
    if (selectedNatures.length > 0) {
      params.append('nature', selectedNatures.join(','));
    }
    if (selectedYears.length > 0) {
      params.append('annee', selectedYears.join(','));
    }
   if (numeroMarche) {
      params.append('numero_marche', numeroMarche);
   }
    if (categorie_d_achat_cle) {
      params.append('categorie_d_achat_cle', categorie_d_achat_cle);
   }
    if (categorie_d_achat_texte) {
      params.append('categorie_d_achat_texte', categorie_d_achat_texte);
   }
   if (fournisseurNom) {
      params.append('fournisseur_nom', fournisseurNom);
   }
    if (montantRange[0] || montantRange[1]) {
      params.append('montant_min', montantRange[0]);
      params.append('montant_max', montantRange[1]);
    }

    if (marcheRange[0] || marcheRange[1]) {

    params.append('duree_du_marche_min', marcheRange[0]);
    console.log(marcheRange[0])
    params.append('duree_du_marche_max', marcheRange[1]);
    console.log(marcheRange[1])
    }

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
    if (startDate) {
      params.append('start_date', formatDate(startDate)); // Format start date
    }
    console.log(startDate);
    if (endDate) {
      params.append('end_date', formatDate(endDate)); // Format end date
    }
    //params.append('limit', rowLimit);
    params.append('limit', rowsPerPage); // Set rowsPerPage as limit for the API
    params.append('offset', page * rowsPerPage); // Calculate offset based on current page
    const requestUrl = `http://localhost/paris_data_app/api/display_data_paris.php?${params.toString()}`;
    console.log("Fetching data with URL:", requestUrl);

    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Received data:", responseData);
        setTotalCount(responseData.dataCount || [] )
        
        setNatureOptions(responseData.natureOptions || []);
        setYearOptions(responseData.years || []);
        setData(responseData.data || []);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
//funtions for analysis
const fetchAggregatedData = () => {
  const requestUrl = `http://localhost/paris_data_app/api/display_data_paris.php?aggregate=true`;

  fetch(requestUrl)
    .then((response) => response.json())
    .then((aggregatedData) => {
      setNatureData(aggregatedData.natureData); 
      setFundingByCaregoryData(aggregatedData.fundingByCategoryData);
      setTopSuppliersData(aggregatedData.topSuppliersData);
      setContractPriceRange(aggregatedData.contractPricerange);
    })
    
    .catch((error) => {
      console.error('Error fetching aggregated data:', error);
    });
};

  // Fetch data when component mounts or selected filters change
  useEffect(() => {
    fetchData();
    fetchAggregatedData();
  }, [selectedNatures, selectedYears, page, rowsPerPage, numeroMarche, fournisseurNom, montantRange, startDate, endDate, categorie_d_achat_cle, categorie_d_achat_texte, marcheRange, ]);

  // Handle row limit change
 // const handleRowLimitChange = (event) => {
 //   setRowLimit(event.target.value);
 // };
  // Handle page change for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when rows per page changes
  };

  const toggleCheckboxGroup = (index) => {
  setOpenCheckboxGroups((prev) =>
    prev.map((isOpen, i) => (i === index ? !isOpen : false))
  );
  };


  // Show loading spinner while data is loading
  if (loading) {
    return (
      <Container>
        <CircularProgress style={{ marginTop: '50px' }} />
      </Container>
    );
  }
  console.log(contractPriceRange);
  return (
    <Container maxWidth="xl" style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
      Marchés publics - Liste des marchés de la collectivité parisienne
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
           <Box
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              padding: 2,
              height: '100%',
              overflowY: 'auto',
            }}
            >
          <Filters
            natureOptions={natureOptions}
            yearOptions={yearOptions}
            selectedNatures={selectedNatures}
            setSelectedNatures={setSelectedNatures}
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
            numeroMarche={numeroMarche}
            setNumeroMarche={setNumeroMarche}
            fournisseurNom={fournisseurNom}
            setfournisseurNom={setfournisseurNom}
            montantRange={montantRange}
            setMontantRange={setMontantRange}
            marcheRange={marcheRange}              
            setMarcheRange={setMarcheRange}  
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            categorie_d_achat_cle={categorie_d_achat_cle}
            setCategorie_d_achat_cle={setCategorie_d_achat_cle}
            categorie_d_achat_texte={categorie_d_achat_texte}
            setCategorie_d_achat_texte={setCategorie_d_achat_texte}
            openCheckboxGroups={openCheckboxGroups}
            toggleCheckboxGroup={toggleCheckboxGroup}
            clearFilters={clearFilters}
          />
    </Box>

   

    </Grid>
<Grid item xs={12} md={9}>

    {/* Data Table */}
      <TableContainer component={Paper} style={{ width: '100%', overflowX: 'auto', marginTop: '20px' }}>
            
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100, ]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <Table style={{ minWidth: 600 }}>

          <TableHead>

            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Année de Notification</TableCell>
              <TableCell>Numéro Marché</TableCell>
              <TableCell>Objet du Marché</TableCell>
              <TableCell>Nature du Marché</TableCell>
              <TableCell>Fournisseur Nom</TableCell>
              <TableCell>Montant Min (HT)</TableCell>
              <TableCell>Montant Max (HT)</TableCell>
              <TableCell>Date de Notification</TableCell>
              <TableCell>Date de début</TableCell>
              <TableCell>Date de fin</TableCell>
              <TableCell>Durée du marché</TableCell>
              <TableCell>Périmètre financier</TableCell>
              <TableCell>Catégorie d'achat clé</TableCell>
              <TableCell>Catégorie d'achat texte</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.annee_de_notification}</TableCell>
                  <TableCell>{item.numero_marche}</TableCell>
                  <TableCell>{item.objet_du_marche}</TableCell>
                  <TableCell>{item.nature_du_marche}</TableCell>
                  <TableCell>{item.fournisseur_nom}</TableCell>
                  <TableCell>{item.montant_min}</TableCell>
                  <TableCell>{item.montant_max}</TableCell>
                  <TableCell>{item.date_de_notification}</TableCell>
                  <TableCell>{item.date_de_debut}</TableCell>
                  <TableCell>{item.date_de_fin}</TableCell>
                  <TableCell>{item.duree_du_marche}</TableCell>
                  <TableCell>{item.perimetre_financier}</TableCell>
                  <TableCell>{item.categorie_d_achat_cle}</TableCell>
                  <TableCell>{item.categorie_d_achat_texte}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
<Charts 
analysisData={natureData} 
dataKey="count" 
title="Contract Count by Category" />
<Charts 
analysisData={fundingByCategoryData} 
dataKey="total_funding" 
title="Funding by Category" />

<TopSuppliersChart 
analysisData={topSuppliersData}  
dataKeyX = "total_funding" 
dataKeyY = "total_funding" 
title = "Top Suppliers by Total Funding" />


<TopSuppliersChart 
  analysisData={contractPriceRange}  
  dataKeyY = "price_range" 
  dataKeyX = "count_contracts" 
  title = "Contract Count by Price Range" 
/>
</Grid>

</Grid>
  
    </Container>
  );
}

export default App;
