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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
  Menu,
  Slider,
 
} from '@mui/material';
import Filters from './Filters';
import './App.css';

function App() {
  const [data, setData] = useState([]); // Full data set to display
  const [loading, setLoading] = useState(true);
  const [natureOptions, setNatureOptions] = useState([]); // Unique nature options
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

  // Fetch data when component mounts or selected filters change
  useEffect(() => {
    fetchData();
  }, [selectedNatures, selectedYears, rowsPerPage, numeroMarche, fournisseurNom, montantRange, startDate, endDate, categorie_d_achat_cle, categorie_d_achat_texte, marcheRange]);

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
  // Handle checkbox change for filters
  const handleCheckboxChange = (event, filterType) => {
    const { value, checked } = event.target;
    const updateFilter = (prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value);

    filterType === 'nature'
      ? setSelectedNatures(updateFilter)
      : setSelectedYears(updateFilter);
  };
  const toggleCheckboxGroup = (index) => {
  setOpenCheckboxGroups((prev) =>
    prev.map((isOpen, i) => (i === index ? !isOpen : false))
  );
  };
  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setMontantRange(newValue);
  };
  const handleMarcheChange = (event, newValue) => {
    setMarcheRange(newValue);
  };


  // Show loading spinner while data is loading
  if (loading) {
    return (
      <Container>
        <CircularProgress style={{ marginTop: '50px' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
      Marchés publics - Liste des marchés de la collectivité parisienne
      </Typography>
      {/* Clear Filters Button */}
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="secondary" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>


 {/* Buttons with individual filter names in a 4x2 flexbox layout */}
      <Box display="flex" flexWrap="wrap" gap={1} marginBottom={3}>

        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(1)}>
            Filter by Year
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(2)}>
            Filter by Numéro Marché
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(3)}>
            Filter by Objet du Marché
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(0)}>
            Filter by Nature du Marché
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(4)}>
            Set min/max montant
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(5)}>
            Filter by Date de début/ de fin
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(6)}>
            Filter by Catégorie d'achat clé
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(7)}>
            Filter by Catégorie d'achat texte
          </Button>
        </Box>
        <Box width="24%">
          <Button variant="outlined" fullWidth onClick={() => toggleCheckboxGroup(8)}>
            Set by duree de marche
          </Button>
        </Box>    
        </Box>    
     


      {/* Nature Filter Checkboxes */}
      {openCheckboxGroups[0] && (      
        <Box sx={{ width: '100%', maxWidth: '600px', mb: 2 }}>
        <Typography variant="h6">Nature du Marché Options</Typography>
        <FormGroup table>
          {natureOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  value={option}
                  checked={selectedNatures.includes(option)}
                  onChange={(e) => handleCheckboxChange(e, 'nature')}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </Box>)}


      {/* Year Filter Checkboxes */}
      {openCheckboxGroups[1] && (      
        <Box sx={{ width: '100%', maxWidth: '600px', mb: 2 }}>
        <Typography variant="h6">Année de Notification Options</Typography>
        <FormGroup row>
          {yearOptions.map((year) => (
            <FormControlLabel
              key={year}
              control={
                <Checkbox
                  value={year}
                  checked={selectedYears.includes(year)}
                  onChange={(e) => handleCheckboxChange(e, 'year')}
                />
              }
              label={year}
            />
          ))}
        </FormGroup>
      </Box>)}
{openCheckboxGroups[3] && (
        
      <Box mb={3}>
        <TextField
          label="Search by Fournisseur Nom"
          variant="outlined"
          fullWidth
          value={fournisseurNom}
          onChange={(e) => setfournisseurNom(e.target.value)}
        />
      </Box>

)}

{openCheckboxGroups[2] && (

      <Box mb={3}>
        <TextField
          label="Search by Numéro Marché"
          variant="outlined"
          fullWidth
          value={numeroMarche}
          onChange={(e) => setNumeroMarche(e.target.value)}
        />
      </Box>
)}

{openCheckboxGroups[4] && (
  <Box mb={3}>
        <Typography gutterBottom>Montant Range (HT)</Typography>
        <Slider
          value={montantRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000000}
        />
  </Box>
)}

{openCheckboxGroups[5] && (

     <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Date de début"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
        />
        <TextField
          label="Date de fin"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
        />
      </Box>
)}
     
{openCheckboxGroups[6] && (
        
      <Box mb={3}>
        <TextField
          label="Search by Catégorie d'achat clé"
          variant="outlined"
          fullWidth
          value={categorie_d_achat_cle}
          onChange={(e) => setCategorie_d_achat_cle(e.target.value)}
        />
      </Box>

)}
{openCheckboxGroups[7] && (
        
      <Box mb={3}>
        <TextField
          label="Search by Catégorie d'achat texte"
          variant="outlined"
          fullWidth
          value={categorie_d_achat_texte}
          onChange={(e) => setCategorie_d_achat_texte(e.target.value)}
        />
      </Box>

)}

{openCheckboxGroups[8] && (
        
        <Box mb={3}>
        <Typography gutterBottom>Durée du marché</Typography>
        <Slider
          value={marcheRange}
          onChange={handleMarcheChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
        />
  </Box>

)}
      {/* Data Table */}
      <TableContainer component={Paper} style={{ width: '100%', overflowX: 'auto', marginTop: '20px' }}>
                {/* Pagination component container aligned to the right */}
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
    </Container>
  );
}

export default App;
