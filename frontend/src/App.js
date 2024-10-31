import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, FormControl } from '@mui/material';
import './App.css';

function App() {
  const [data, setData] = useState([]); // Full data set to display
  const [loading, setLoading] = useState(true);
  const [natureOptions, setNatureOptions] = useState([]); // Unique nature options
  const [selectedNatures, setSelectedNatures] = useState([]); // Selected nature options
  const [rowLimit, setRowLimit] = useState("100"); // Default row limit to 100
  // Define fetchData function here, above the useEffect hook
  const fetchData = () => {
    const params = new URLSearchParams();
    if (selectedNatures.length > 0) {
      params.append('nature', selectedNatures.join(',')); 
    }
  // Append the row limit
  params.append('limit', rowLimit);


    const requestUrl = `http://localhost/paris_data_app/api/display_data_paris.php?${params.toString()}`;
    console.log("Fetching data with URL:", requestUrl); // Debugging log for request URL
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Received data:", responseData);
        setNatureOptions(responseData.natureOptions || []);
        setData(responseData.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  // Fetch natureOptions and data on initial load and whenever selectedNatures changes
  useEffect(() => {
    fetchData();
  }, [selectedNatures]); // Refetch data when selectedNatures changes


  // Handle row limit selection
  const handleRowLimitChange = (event) => {
    setRowLimit(event.target.value);
  };
  // Handle checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedNatures((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((nature) => nature !== value)
    );
  };
  // Render loading spinner if data is not yet loaded
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
        Market Data
      </Typography>
      {/* Row Limit Options */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Row Limit</Typography>
        <FormControl component="fieldset">
          <RadioGroup row value={rowLimit} onChange={handleRowLimitChange}>
            <FormControlLabel value="50" control={<Radio />} label="Under 50" />
            <FormControlLabel value="100" control={<Radio />} label="Under 100" />
            <FormControlLabel value="all" control={<Radio />} label="Show all" />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* Nature du Marché Checkboxes */}
      <Box sx={{ width: '100%', maxWidth: '600px', mb: 2 }}>
        <Typography variant="h6">Nature du Marché Options</Typography>
        <FormGroup>
          {natureOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={
                  <Checkbox
                  value={option}
                  checked={selectedNatures.includes(option)} // Reflect selection state
                  onChange={handleCheckboxChange} // Handle change
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
        
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} style={{ width: '100%', overflowX: 'auto', marginTop: '20px' }}>
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
            {Array.isArray(data) && data.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 50 }}>{item.id}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: 50 }}>{item.annee_de_notification}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: 150 }}>{item.numero_marche}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 100 }}>{item.objet_du_marche}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 100 }}>{item.nature_du_marche}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 100 }}>{item.fournisseur_nom}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 150 }}>{item.montant_min}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 100 }}>{item.montant_max}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 100 }}>{item.date_de_notification}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 100 }}>{item.date_de_debut}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 100 }}>{item.date_de_fin}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: 150 }}>{item.duree_du_marche}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: 150 }}>{item.perimetre_financier}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: 150 }}>{item.categorie_d_achat_cle}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 150 }}>{item.categorie_d_achat_texte}</TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
